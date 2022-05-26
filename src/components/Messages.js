import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { IncomingMessage } from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { SendMessage } from "./SendMessage";

export const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  const msgs = chatState.messages;

  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}
      <div id="messages" className="msg_history">
        {msgs.map((msg) =>
          msg.to === auth.uid ? (
            <IncomingMessage key={msg._id} incomingMsg={msg} />
          ) : (
            <OutgoingMessage key={msg._id} outgoingMsg={msg} />
          )
        )}
      </div>
      {/* <!-- Historia Fin --> */}

      <SendMessage />
    </div>
  );
};
