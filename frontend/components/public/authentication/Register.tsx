import { FormEvent, useState } from "react";
import styles from "./register.module.css";
import { Constants } from "../constants/Constants";
import { RegisterUserPayload } from "./interface/RegisterUserPayload";
import { UserResponse } from "./interface/UserResponse";
import { useRouter } from "next/router";
import { setLoggedInUserInLocalStorage } from "../storage/LocalStorage";

export default function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");

  const router = useRouter();

  const registerUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: RegisterUserPayload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      passwordRepeat: passwordRepeat,
    };

    fetch(`${Constants.API_URL}/user/register`, {
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
  };

  return (
    <form className={styles.register} onSubmit={registerUser}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Enter your first name"
        onChange={(e) => setFirstName(e.target.value)}
        required
      ></input>
      <input
        type="text"
        placeholder="Enter your last name"
        onChange={(e) => setLastName(e.target.value)}
        required
      ></input>
      <input
        type="email"
        placeholder="Enter your email"
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
      <input
        type="password"
        placeholder="Repeat password"
        autoComplete="on"
        onChange={(e) => setPasswordRepeat(e.target.value)}
        required
      ></input>

      <input type="submit" value="Register" />
    </form>
  );
}
