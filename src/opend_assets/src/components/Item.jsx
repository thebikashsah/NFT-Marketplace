import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import {idlFactory} from "../../../declarations/nft"
import { Principal } from "@dfinity/principal"
import { canisterId } from "../../../declarations/nft";
import Button from "./Button";

function Item(props) {

  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [button, setButton] = useState();
  const [priceinput, setpriceinput] = useState();



  const id =props.id;

  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({
    host: localHost
  });

  // IDL factory -> Interface Descriptive Language - used by frontend to interact with backend. Translator between motoko and javascript.


  async function LoadNFT(){

    const NFTActor = await Actor.createActor(idlFactory,{
      agent,
      canisterId: id,
    });

    const name = await NFTActor.getName();
    const owner= await NFTActor.getOwner();
    const imageData = await NFTActor.getContent();
    const imageContent = new Uint8Array(imageData);
    const img = URL.createObjectURL(new Blob([imageContent.buffer],{type: "image/png"}));
    setName(name);
    setOwner(owner.toText());
    setImage(img);

    setButton(<Button handleClick={handleSell} text={"Sell"}/>);



  }

  useEffect(()=>{
    LoadNFT();
  },[]);

  let price;
  function handleSell(){
    console.log("Sell Clicked!");
    setpriceinput(<input
      placeholder="Price in DANG"
      type="number"
      className="price-input"
      value={price}
      onChange={(e) => (price=e.target.val)}
    />);
    setButton(<Button handleClick={sellItem} text={"Confirm"}/>);

  }

  async function sellItem(){

  }


  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name} <span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          {priceinput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
