/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import React from 'react';
import { ERC721Minter } from "./ERC721Minter";
import { ERC721Checker } from "./ERC721Checker";
import bunzz from "bunzz-sdk";

const DAPP_ID = process.env.REACT_APP_DAPP_ID;
const API_KEY = process.env.REACT_APP_API_KEY;

const Minter = () => {
  const [handler, setHandler] = useState();
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    setup()
  }, [])

  const setup = async () => {
    const handler = await bunzz.initializeHandler({
      dappId: DAPP_ID,
      apiKey: API_KEY,
    });

    const userAddress = await handler.getSignerAddress();

    console.log(userAddress);
    setUserAddress(userAddress);
    setHandler(handler);
  }

  return (
    <div className="center">
      <div>
        <ERC721Minter bunzz={handler} userAddress={userAddress} />
        <ERC721Checker bunzz={handler} userAddress={userAddress} />
      </div>
    </div>
  );
};

export default Minter;

