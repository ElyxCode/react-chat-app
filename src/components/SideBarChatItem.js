import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { scrollToBottomWithoutAnimate } from "../helpers/scrollToBottom";

export const SideBarChatItem = ({ user }) => {
  const { chatState, dispatch } = useContext(ChatContext);
  const { activeChat } = chatState;

  const activeChatNow = async () => {
    dispatch({
      type: types.activeChat,
      payload: user.uid,
    });

    // Cargar los mensajes del chat.
    const resp = await fetchWithToken(`message/${user.uid}`);

    dispatch({
      type: types.loadChats,
      payload: resp.messages.reverse(),
    });

    scrollToBottomWithoutAnimate("messages");
  };

  return (
    <div
      className={`chat_list ${user.uid === activeChat && "active_chat"}`}
      onClick={activeChatNow}
    >
      {/* active_chat */}
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{user.name}</h5>
          {user.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
