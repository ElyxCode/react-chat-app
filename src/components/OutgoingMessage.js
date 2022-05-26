import React from "react";
import { hourMonth } from "../helpers/hourMonth";

export const OutgoingMessage = ({ outgoingMsg }) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{outgoingMsg.message}</p>
        <span className="time_date">{hourMonth(outgoingMsg.createdAt)}</span>
      </div>
    </div>
  );
};
