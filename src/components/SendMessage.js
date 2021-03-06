import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";

export const SendMessage = () => {
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  const [message, setMessage] = useState("");

  const onChange = ({ target }) => {
    const { value } = target;
    setMessage(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    }

    // Enviar el mensaje al backend.
    socket?.emit("personal-message", {
      from: auth.uid,
      to: chatState.activeChat,
      message,
    });

    setMessage("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            name="name"
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            value={message}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button
            className="msg_send_btn mt-3"
            type="submit"
            onClick={onSubmit}
          >
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};
