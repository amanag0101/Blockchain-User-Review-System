import Content from "./Content";
import styles from "./homepage.module.css";

export default function Homepage() {
  return (
    <div className={styles.homepage}>
      <Content
        heading={"How it Works"}
        img={"/img/working.png"}
        body={
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae optio voluptas nam, expedita earum cupiditate quia architecto, sint adipisci numquam asperiores dolorum. Pariatur, voluptas ducimus qui sapiente quod labore. Repellendus. orem ipsum, dolor sit amet consectetur adipisicing elit. Beatae optio voluptas nam, expedita earum cupiditate quia architecto, sint adipisci numquam asperiores dolorum. Pariatur, voluptas ducimus qui sapiente quod labore. Repellendus. orem ipsum, dolor sit amet consectetur adipisicing elit. Beatae optio voluptas nam, expedita earum cupiditate quia architecto, sint adipisci numquam asperiores dolorum. Pariatur, voluptas ducimus qui sapiente quod labore. Repellendus."
        }
      />

      <div className="horizontal-divider"></div>

      <Content
        heading={"About Us"}
        img={"/img/working.png"}
        body={
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae optio voluptas nam, expedita earum cupiditate quia architecto, sint adipisci numquam asperiores dolorum. Pariatur, voluptas ducimus qui sapiente quod labore. Repellendus. orem ipsum, dolor sit amet consectetur adipisicing elit. Beatae optio voluptas nam, expedita earum cupiditate quia architecto, sint adipisci numquam asperiores dolorum. Pariatur, voluptas ducimus qui sapiente quod labore. Repellendus. orem ipsum, dolor sit amet consectetur adipisicing elit. Beatae optio voluptas nam, expedita earum cupiditate quia architecto, sint adipisci numquam asperiores dolorum. Pariatur, voluptas ducimus qui sapiente quod labore. Repellendus."
        }
      />
    </div>
  );
}
