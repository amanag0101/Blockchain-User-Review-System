import Image from "next/image";
import styles from "./post.module.css";
import { Rating } from "@mui/material";
import { Post } from "./Review";

interface ProductReviewProps {
  post: Post | undefined;
}

export default function ProductReview(props: ProductReviewProps) {
  return (
    <div>
      <div className={styles["review"]}>
        <div className={styles["col-1"]}>
          <Image width={500} height={500} src="/img/working.png"></Image>
        </div>

        <div className={styles["col-2"]}>
          <h2>User Review</h2>

          <div>
            <h3>{props.post?.reviewTitle}</h3>
            <Rating
              name="half-rating-read"
              defaultValue={props.post?.rating}
              precision={1}
              readOnly
            />
            <p>{props.post?.review}</p>
          </div>
        </div>

        {/* <div className={styles["col-2"]}>
          <h3
            style={{ textAlign: "left", marginTop: "20px", marginLeft: "10px" }}
          >
            Specifications
          </h3>
          <div className={styles["specs"]}>
            <div className={styles["col-1"]}>
              <p>
                <b>Display</b>
              </p>
              <p>
                <b>Capacity</b>
              </p>
              <p>
                <b>Splash, Water, and Dust Resistant</b>
              </p>
              <p>
                <b>Camera and Video</b>
              </p>
              <p>
                <b>Front Camera</b>
              </p>
              <p>
                <b>In the Box</b>
              </p>
            </div>
            <div className={styles["col-2"]}>
              <p>6.7-inch Super Retina XDR display</p>
              <p>128GB, 256GB, 512GB, 1TB</p>
              <p>
                Ceramic Shield front, glass back and aluminum design, water and
                dust resistant (rated IP68 - maximum depth of 6 meters up to 30
                minutes)
              </p>
              <p>
                Dual-camera system: 12MP Main, 12MP Ultrawide with Portrait
                mode, Depth Control, Portrait Lighting, Smart HDR 4, and 4K
                Dolby Vision HDR video up to 60 fps
              </p>
              <p>
                12MP TrueDepth front camera with Portrait mode, Depth Control,
                Portrait Lighting, and Smart HDR 4
              </p>
              <p>iPhone with iOS 16, USB-C to Lightning Cable, Documentation</p>
            </div>
          </div>
        </div> */}
      </div>
      {/* <div className={styles["actual"]}>
        <h2>User Review</h2>

        <div>
          <h3>{props.post?.reviewTitle}</h3>
          <Rating
            name="half-rating-read"
            defaultValue={props.post?.rating}
            precision={1}
            readOnly
          />
          <p>
            {props.post?.review}
          </p>
        </div>
      </div> */}
    </div>
  );
}
