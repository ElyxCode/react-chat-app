import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SideBarChatItem } from "./SideBarChatItem";

export const SideBar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  const { uid } = auth;
  const chats = chatState.users;

  return (
    <div className="inbox_chat">
      {chats
        .filter((user) => user.uid !== uid)
        .map((user) => (
          <SideBarChatItem key={user.uid} user={user} />
        ))}
      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  );
};
