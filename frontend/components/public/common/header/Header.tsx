import { useRouter } from "next/router";
import Link from "next/link";
import { useContext } from "react";

import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from '@mui/icons-material/Add';
import FlareIcon from "@mui/icons-material/Flare";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { LayoutContext } from "../../layout/Layout";
import { Theme } from "../../constants/Theme";
import styles from "./header.module.css";
import {
  removeUserFromLocalStorage,
} from "../../storage/LocalStorage";

export default function Header() {
  const { theme, toggleTheme } = useContext(LayoutContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(LayoutContext);

  const currentLink: string = useRouter().asPath;

  const isActiveLink = (link: string): string => {
    return currentLink === link ? "active" : "";
  };

  return (
    <div className={styles.header}>
      <div className={styles["col-1"]}>
        <h1>Review System</h1>
      </div>

      <div className={styles["col-2"]}>
        <div className={`${styles.item} ${styles[isActiveLink("/")]}`}>
          <HomeIcon className="icon" />
          <Link href="/">Home</Link>
        </div>

        <div className={`${styles.item} ${styles[isActiveLink("/reviews")]}`}>
          <StarIcon className="icon" />
          <Link href="/reviews">Reviews</Link>
        </div>

        {isLoggedIn ? (
          <div
            className={`${styles.item} ${
              styles[isActiveLink("/user/add-review")]
            }`}
          >
            <AddIcon className="icon" />
            <Link href="/user/add-review">Add Review</Link>
          </div>
        ) : (
          <></>
        )}

        <div className={styles.theme}>
          <div className={styles["col-1"]} onClick={toggleTheme}>
            <FlareIcon
              className={styles["icon"]}
              sx={{ color: theme === Theme.LIGHT ? "#ff9100" : "#ff9100" }}
            />
          </div>
          <div className={styles["col-2"]} onClick={toggleTheme}>
            <NightsStayIcon
              className={styles["icon"]}
              sx={{ color: theme === Theme.DARK ? "#fff" : "#000" }}
            />
          </div>
        </div>
      </div>

      <div className={styles["col-3"]}>
        <div className={`${styles.item} ${styles[isActiveLink("/login")]}`}>
          <AccountCircleIcon className="icon" />
          {isLoggedIn ? (
            <div
              onClick={() => {
                setIsLoggedIn(false);
                removeUserFromLocalStorage();
              }}
            >
              <Link href="/">Logout</Link>
            </div>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
