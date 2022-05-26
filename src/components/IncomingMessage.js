import React from "react";
import { hourMonth } from "../helpers/hourMonth";

export const IncomingMessage = ({ incomingMsg }) => {
  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
        />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{incomingMsg.message}</p>
          <span className="time_date">{hourMonth(incomingMsg.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
