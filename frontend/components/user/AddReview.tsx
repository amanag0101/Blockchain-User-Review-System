import { Dialog, DialogProps, DialogTitle, Rating } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Tesseract from "tesseract.js";
import wordsToNumbers from "words-to-numbers";
import styles from "./add-review.module.css";
import CircularProgressWithLabel from "../public/common/progressbar/CircularProgressWithLabel";
import { Constants } from "../public/constants/Constants";
import { AppContext } from "../../pages/_app";
import axios from "axios";
import { useRouter } from "next/router";

interface VerifyAmazonInvoiceRequest {
  productName: string;
  orderNumber: string;
  invoiceNumber: string;
}

interface VerifyAmazonInvoiceResponse {
  valid: boolean;
}

interface InvoiceData {
  isAmazon: boolean;
  isProductName: boolean;
  productName: string;
  invoiceDate: string;
  orderNumber: string;
  invoiceNumber: string;
  price: string;
}

export default function AddReview() {
  const { account, reviewContract } = useContext(AppContext);
  const [productName, setProductName] = useState<string>("");
  const [productPageLink, setProductPageLink] = useState<string>("");
  const [reviewTitle, setReviewTitle] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(1);
  const [invoiceImage, setInvoiceImage] = useState<File | null>(null);
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [invoiceImageData, setInvoiceImageData] = useState<string>("");
  const [invoiceData, setInvoiceData] = useState<InvoiceData>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [addReviewDialog, setAddReviewDialog] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isInvoiceValid, setIsInvoiceValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (progress === 100) setDialogOpen(false);
  }, [progress]);

  useEffect(() => {
    if (invoiceImageData !== "") extractInvoiceDataFromProcessedImage();
  }, [invoiceImageData]);

  useEffect(() => {
    if (invoiceData !== undefined) {
      verifyInvoice();
    }
  }, [invoiceData]);

  function processInvoiceImage() {
    if (productName === "") {
      setErrorMessage("Please enter the product name !");
      return;
    }

    if (invoiceImage === null) {
      setErrorMessage("Please upload an image of your invoice!");
      return;
    }

    setErrorMessage("");

    setDialogOpen(true);
    Tesseract.recognize(invoiceImage ?? "", "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") setProgress(m.progress * 100);
      },
    }).then(({ data: { text } }) => {
      setInvoiceImageData(text);
    });
  }

  async function extractInvoiceDataFromProcessedImage() {
    const productNameRegex = new RegExp(productName, "mi");
    const isProductName =
      invoiceImageData.match(productNameRegex)?.index ?? false;

    const amazonRegex = /a\s*m\s*a\s*z\s*o\s*n/im;
    const isAmazon = invoiceImageData.match(amazonRegex)?.index === 0 ?? false;

    const invoiceDateRegex = /[\n\r][ \t]*Invoice Date :[ \t]*([^\n\r]*)/im;
    const invoiceDate = invoiceImageData.match(invoiceDateRegex)?.[1];

    const orderNumberRegex = /[\n\r][ \t]*Order Number:[ \t]*([^\n\r]*)/im;
    const orderNumber = invoiceImageData
      .match(orderNumberRegex)?.[1]
      .split(" ")[0];

    const invoiceNumber = invoiceImageData
      .match(orderNumberRegex)?.[1]
      .split(" ")[4];

    const amountInWordsRegex =
      /[\n\r][ \t]*Amount in Words:[ \t\s]*([^\n\r]*)/im;
    let amountInWords = invoiceImageData.match(amountInWordsRegex)?.[1];
    let price = wordsToNumbers(amountInWords ?? "") + "";
    price = price.split(" ")[0];

    setInvoiceData({
      isAmazon: isAmazon,
      isProductName: typeof isProductName === "number",
      productName: productName,
      invoiceDate: invoiceDate ?? "",
      orderNumber: orderNumber ?? "",
      invoiceNumber: invoiceNumber ?? "",
      price: price,
    });

    setDialogOpen(false);
  }

  async function verifyInvoice() {
    if (!invoiceData?.isProductName) {
      setErrorMessage("Invalid product name !");
      return;
    } else setErrorMessage("");

    let url = `${Constants.API_URL}/amazon-invoice/verify`;
    let payload: VerifyAmazonInvoiceRequest = {
      productName: invoiceData?.productName ?? "",
      orderNumber: invoiceData?.orderNumber ?? "",
      invoiceNumber: invoiceData?.invoiceNumber ?? "",
    };

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then(async (res) => await res.json())
      .then((res) => {
        const response: VerifyAmazonInvoiceResponse = res;
        setIsInvoiceValid(response.valid);

        if (!response.valid) setErrorMessage("Invalid Invoice!");
      })
      .catch((err) => console.log(err));

    fetch(`${Constants.API_URL}/amazon-invoice/is-used`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        orderNumber: invoiceData?.orderNumber ?? "",
        invoiceNumber: invoiceData?.invoiceNumber ?? "",
      }),
    })
      .then(async (res) => await res.json())
      .then((res) => {
        const isUsed: boolean = res;
        setIsInvoiceValid(!isUsed);

        if (isUsed) setErrorMessage("Invoice already used!");
      })
      .catch((err) => console.log(err));
  }

  async function addReview() {
    if (reviewTitle === "") {
      setErrorMessage("Review Title cannot be blank !");
      return;
    }

    if (review === "") {
      setErrorMessage("Review cannot be blank !");
      return;
    }

    if (reviewImage === null) {
      setErrorMessage("Please upload a product image.");
      return;
    }

    setErrorMessage("");
    setAddReviewDialog(true);

    let imgHash = "";

    try {
      const formData = new FormData();
      formData.append("file", reviewImage as Blob);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: "3950d1fcef3a77c4ab54",
          pinata_secret_api_key:
            "fea027a87cd9927be70e44f43089048a3c50904f173e5c36469c57201db311c8",
          "Content-Type": "multipart/form-data",
        },
      });

      imgHash = resFile.data.IpfsHash;
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }

    reviewContract!!.methods
      .uploadPost(
        imgHash,
        invoiceData?.productName,
        productPageLink,
        invoiceData?.price,
        reviewTitle,
        rating,
        review
      )
      .send({ from: account, gas: 900000 });

    fetch(`${Constants.API_URL}/amazon-invoice/set-used`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        orderNumber: invoiceData?.orderNumber ?? "",
        invoiceNumber: invoiceData?.invoiceNumber ?? "",
      }),
    }).catch((err) => console.log(err));

    setAddReviewDialog(false);
    router.push("/reviews");
  }

  return (
    <div className={styles["add-review"]}>
      <div className={styles.container}>
        {isInvoiceValid ? (
          <></>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter product name *"
              onChange={(e) => setProductName(e.target.value)}
              required
            />

            <input
              type="url"
              placeholder="Enter product page link"
              onChange={(e) => setProductPageLink(e.target.value)}
            />

            <input
              type="file"
              placeholder="Choose file"
              onChange={(e) => {
                setInvoiceImage(e.target.files ? e.target.files[0] : null);
              }}
              required
            />
          </>
        )}

        {isInvoiceValid ? (
          <input
            type="text"
            placeholder="Enter review title *"
            onChange={(e) => setReviewTitle(e.target.value)}
          />
        ) : (
          <></>
        )}

        {isInvoiceValid ? (
          <textarea
            placeholder="Write your review... *"
            rows={15}
            defaultValue={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        ) : (
          <></>
        )}

        {isInvoiceValid ? (
          <input
            type="file"
            placeholder="Choose file"
            onChange={(e) => {
              setReviewImage(e.target.files ? e.target.files[0] : null);
            }}
            required
          />
        ) : (
          <></>
        )}

        {isInvoiceValid ? (
          <div className={styles["rating"]}>
            <p>Rating: </p>
            <Rating
              name="half-rating-read"
              value={rating}
              precision={1}
              onChange={(e, val) => setRating(val ?? 1)}
            />
          </div>
        ) : (
          <></>
        )}

        {isInvoiceValid ? (
          <button onClick={addReview}>Add Review</button>
        ) : (
          <button onClick={processInvoiceImage}>Verify Invoice</button>
        )}
      </div>

      {errorMessage !== "" ? (
        <p className={styles["error-msg"]}>{errorMessage}</p>
      ) : (
        <></>
      )}

      <Dialog open={dialogOpen} maxWidth={"xl" as DialogProps["maxWidth"]}>
        <DialogTitle style={{ color: "#000" }}>
          Processing Image ...
        </DialogTitle>
        <CircularProgressWithLabel
          style={{ color: "#000" }}
          variant="determinate"
          value={progress}
        />
      </Dialog>

      <Dialog open={addReviewDialog} maxWidth={"xl" as DialogProps["maxWidth"]}>
        <DialogTitle style={{ color: "#000" }}>Adding Review ...</DialogTitle>
      </Dialog>
    </div>
  );
}
