import Register from "./Register";
import styles from "./authentication.module.css";
import Login from "./Login";

export default function Authentication() {
    return (
        <div className={styles.authentication}>
            <div className={styles["col-1"]}>
                <Register />
            </div>
            <div className={styles["col-2"]}>
                <Login />
            </div>
        </div>
    );
}