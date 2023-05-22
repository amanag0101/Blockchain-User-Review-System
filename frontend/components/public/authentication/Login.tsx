import { FormEvent, useState } from "react";
import styles from "./login.module.css";
import { LoginUserPayload } from "./interface/LoginUserPayload";
import { Constants } from "../constants/Constants";
import { UserResponse } from "./interface/UserResponse";
import { useRouter } from "next/router";
import { setLoggedInUserInLocalStorage } from "../storage/LocalStorage";
import { LayoutContext } from "../layout/Layout";
import { useContext } from "react";

export default function Login() {
  const { setIsLoggedIn } = useContext(LayoutContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function loginUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: LoginUserPayload = {
      email: email,
      password: password,
    };

    fetch(`${Constants.API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        const res: UserResponse = (await response.json()) as UserResponse;
        if (response.ok && response.status === 200) {
          setLoggedInUserInLocalStorage(res);
          router.push("/user");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <form className={styles.login} onSubmit={(e) => loginUser(e)}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter your username"
        autoComplete="on"
        onChange={(e) => setEmail(e.target.value)}
        required
      ></input>
      <input
        type="password"
        placeholder="Enter password"
        autoComplete="on"
        onChange={(e) => setPassword(e.target.value)}
        required
      ></input>

      <input type="submit" value="Login" />
    </form>
  );
}
