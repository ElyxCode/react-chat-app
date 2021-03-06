import { createContext, useState, useCallback, useContext } from "react";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);

  const login = async (email, password) => {
    const resp = await fetchWithoutToken("login", { email, password }, "POST");

    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { user } = resp;

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    }

    return resp.ok;
  };

  const register = async (name, email, password) => {
    const resp = await fetchWithoutToken(
      "login/new",
      { name, email, password },
      "POST"
    );

    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { user } = resp;

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    }

    return resp;
  };

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    // Si el token no existe.
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }

    const resp = await fetchWithToken("login/renew");

    if (!resp.ok) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }

    if (resp.ok) {
      localStorage.setItem("token", resp.token);

      const { user } = resp;

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

      return true;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      checking: false,
      logged: false,
      uid: null,
    });

    dispatch({
      type: types.logoutChats,
    });
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, register, verifyToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
