import Image from "next/image";
import styles from "./content.module.css";

interface ContentProps {
    heading: string,
    img: string,
    body: string
}

export default function Content(props: ContentProps) {
    return (
        <div className={styles.content}>
            <div className={styles.container}>
                <div className={styles["col-1"]}>
                    <Image src={props.img} width={200} height={200}></Image>
                </div>
                <div className={styles["col-2"]}>
                    <h2>{props.heading}</h2>
                    <p>{props.body}</p>
                </div>
            </div>
        </div>
    );
}