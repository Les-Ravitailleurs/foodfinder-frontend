import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import fb from "./facebook.svg";
import messenger from "./messenger.svg";
import whatsapp from "./whatsapp.svg";
import twitter from "./twitter.svg";

import "./SocialShare.css";

const SocialShare = ({ poolId }) => {
  const url = `${document.location.protocol}//${document.location.host}/collecte/${poolId}`;
  return (
    <div className="SocialShare">
      <TwitterShareButton
        url={url}
        title="Aidez-moi à collecter des repas pour les plus démunis !"
      >
        <img src={twitter} alt="twitter" />
      </TwitterShareButton>
      <FacebookShareButton
        url={url}
        quote="Aidez-moi à collecter des repas pour les plus démunis !"
      >
        <img src={fb} alt="fb" />
      </FacebookShareButton>
      <WhatsappShareButton url={url}>
        <img src={whatsapp} alt="whatsapp" />
      </WhatsappShareButton>
      <a
        onClick={() =>
          window.open(
            `http://www.facebook.com/dialog/send?app_id=2616951421960101&link=${url}&redirect_uri=${url}`,
            "Share to messenger",
            "height=400,width=1000,top=100,left=100,modal=yes,alwaysRaised=yes"
          )
        }
      >
        <img
          src={messenger}
          alt="messenger"
          style={{ height: 50, top: 7, position: "relative" }}
        />
      </a>
    </div>
  );
};

export default SocialShare;
