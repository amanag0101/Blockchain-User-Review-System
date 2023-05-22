import { createContext, useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import Review from "../build/contracts/Review.json";

interface AppContextProps {
  account: string;
  reviewContract?: Contract;
}

export const AppContext = createContext<AppContextProps>({
  account: "",
  reviewContract: undefined,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [account, setAccount] = useState<string>("");
  const [reviewContract, setReviewContract] = useState<Contract>();

  useEffect(() => {
    loadWeb3();
  }, []);

  async function loadWeb3() {
    const web3 = new Web3("HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkData = Review.networks[5777];

    if (networkData) {
      const reviewContract = new web3.eth.Contract(
        Review.abi as unknown as AbiItem,
        networkData.address
      );
      setReviewContract(reviewContract);
    } else {
      window.alert("Review contract not deployed to the detected network!");
    }
  }

  return (
    <AppContext.Provider
      value={{
        account: account,
        reviewContract: reviewContract,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
