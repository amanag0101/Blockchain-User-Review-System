import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./itembox.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { Rating } from "@mui/material";

interface ItemBoxProps {
  id: string;
  productName: string;
  productLink: string;
  price: number;
  rating: number;
  imageHash: string;
  reviewTitle: string;
  review: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "var(--color-background-secondary)",
  border: "2px solid #000",
  boxShadow: 24,
  p: {
    padding: "40px",
  },
};

export default function ItemBox(props: ItemBoxProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className={styles.itembox}>
      <div>
        <img src={`https://gateway.pinata.cloud/ipfs/${props.imageHash}`}></img>
      </div>

      <div className={styles["item"]}>
        <p
          className={styles["product_name"]}
          onClick={() => {
            setShowModal(true);
          }}
        >
          <b>{props.productName}</b>
        </p>
        <p className={styles["link"]}>
          <a href={props.productLink} target="_blank">
            {props.productLink}
          </a>
        </p>
        <Rating
          name="half-rating-read"
          defaultValue={props.rating}
          precision={1}
          readOnly
        />
        <p>
          <b>Rs {props.price}</b>
        </p>
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles["review"]}>
            <p
              style={{
                cursor: "pointer",
                width: "auto",
                display: "inline-block",
                textAlign: "right",
                float: "right",
                marginTop: "-20px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              onClick={() => setShowModal(false)}
            >
              X
            </p>
            <img
              style={{
                maxWidth: "50%",
                maxHeight: "50%",
                display: "block",
                margin: "auto",
              }}
              src={`https://gateway.pinata.cloud/ipfs/${props.imageHash}`}
            ></img>
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "8px",
            }}
          >
            <p
              style={{
                padding: "4px",
              }}
            >
              <b>{props.productName}</b>
            </p>

            <p
              style={{
                padding: "4px",
              }}
            >
              <b>Rs {props.price}</b>
            </p>

            <p
              style={{
                padding: "4px",
              }}
            >
              <a
                style={{
                  color: "var(--color-blue)",
                  textAlign: "center",
                }}
                href={props.productLink}
                target="_blank"
              >
                {props.productLink}
              </a>
            </p>

            <p
              style={{
                padding: "4px",
                textAlign: "left",
              }}
            >
              <b>{props.reviewTitle}</b>
            </p>

            <p style={{ textAlign: "left" }}>
              <Rating
                name="half-rating-read"
                defaultValue={props.rating}
                precision={1}
                readOnly
              />
            </p>

            <p
              style={{
                textAlign: "left",
                padding: "6px",
              }}
            >
              {props.review}
            </p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
