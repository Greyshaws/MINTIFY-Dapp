/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import React from 'react';

export const ERC721Checker = ({ bunzz, userAddress }) => {
  const [tokenId, setTokenId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [onGoing, setOnGoing] = useState(false);

  const submit = async () => {
    setOnGoing(true);
    try {
      const contract = await bunzz.getContract("NFT (IPFS Mintable)");
      const { data: tokenUri } = await contract.tokenURI(tokenId);
      const url = tokenUri.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/");
      const res = await fetch(url);
      const data = await res.json();
      setName(data.name);
      setDescription(data.description);
      setImage(data.image.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/"));
    } catch (err) {
      console.error(err);
    } finally {
      setOnGoing(false);
    }
  };

  return (
    <div className="wrapper2">
      <p className="title2">View NFT</p>
      <p className="use">Input token ID to view NFT</p>
      <input
       className="view-box"
        placeholder="token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        type="text"
      /><br/>
      {onGoing ? (
        <div className="center">Loading...</div>
      ) : (
        <button className="get" onClick={submit}>View</button>
      )}
      {name ? <p className="name">Name: {name}</p> : <></>}
      {description ? <p className="desc">Description: {description}</p> : <></>}
      {image ? <img src={image} alt="image" className="image" /> : <></>}
    </div>
  );
};