import { createContext, useReducer } from "react";
import { chatReducer } from "./chatReducer";

const initialState = {
  uid: "",
  activeChat: null, //UID delusuario al que yo quiero enviar mensajes
  users: [], // Todos los usuarios de la base de datos.
  messages: [], // El chat seleccionado.
};

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
