import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "../router/AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { auth, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (auth.checking) {
    return <h1>Wait, please</h1>;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <PrivateRoute uid={auth.uid}>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="auth/*"
            exact
            element={
              <PublicRoute uid={auth.uid}>
                <AuthRouter />
              </PublicRoute>
            }
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};
