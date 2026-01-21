import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TwitterLogo from "assets/images/twitterLogo.png";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
  XIcon

} from "react-share";

import s from "./ShareCommunity.scss";

class ShareCommunity extends Component {
  render() {
    const shareUrl =
      "https://www.aeratechnology.com" + this.props.location.pathname;

    const text = this.props.location.pathname;

    const text1 = text.replace(/-/g, " ");

    const text2 = text1.replace("/", "");

    const text3 = text2.toUpperCase();

    const title = text3;

    const finalTitle = title.substring(5);

    return (
      <div className={s.share}>
        <div className={s.share__container}>
          <h3>Share This</h3>
          <div className={s.share__someNetwork}>
            <FacebookShareButton
              url={shareUrl}
              quote={finalTitle}
              className={s.share__someNetwork__shareButton}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>

          <div className={s.share__someNetwork}>
            <TwitterShareButton
              url={shareUrl}
              title={finalTitle}
              className={s.share__someNetwork__shareButton}
            >
              
              <img src={TwitterLogo} alt="share it on X" width="31" height="31" />
            </TwitterShareButton>
          </div>

         

          <div className={s.share__someNetwork}>
            <LinkedinShareButton
              url={shareUrl}
              title={finalTitle}
              className={s.share__someNetwork__shareButton}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>

          <div className={s.share__someNetwork}>
            <EmailShareButton
              url={shareUrl}
              subject={finalTitle}
              body="body"
              className={s.share__someNetwork__shareButton}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ShareCommunity);
