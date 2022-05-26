import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { AuthContext } from "../auth/AuthContext";

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);

  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formRegister;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;

    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };

  const handleOnSubmit = async (ev) => {
    ev.preventDefault();
    const { ok, msg } = await register(name, email, password);

    if (!ok) {
      Swal.fire("Error", msg, "error");
    }
  };

  const todoOK = () => {
    return name.length > 0 && email.length > 0 && password.length > 0
      ? true
      : false;
  };

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={handleOnSubmit}
    >
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="text"
          name="name"
          placeholder="Nombre"
          value={name}
          onChange={handleOnChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleOnChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleOnChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          className="login100-form-btn"
          type="submit"
          disabled={!todoOK()}
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
};
