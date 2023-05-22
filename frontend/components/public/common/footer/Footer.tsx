import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles["col-1"]}>
                <h3><Link href="#">Policy</Link></h3>
                <Link href="#">Privacy</Link>
                <Link href="#">Security</Link>
                <Link href="#">Terms of Use</Link>
            </div>

            <div className={styles["col-2"]}>
            <h3><Link href="#">Social Media</Link></h3>
                <Link href="#">Twitter</Link>
                <Link href="#">Instagram</Link>
                <Link href="#">Youtube</Link>
            </div>
        </div>
    );
}