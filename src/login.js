// Login.js

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setUserData }) => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: mail,
        password,
      });
      console.log("Login successful:", response.data);
      setUserData(response.data.user);
      navigate("/shop");
      // Додайте обробку відповіді, якщо потрібно
    } catch (error) {
      console.error("Login error:", error);
      // Додайте обробку помилок, якщо потрібно
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Вхід</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Почта
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Пароль
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Вхід
                  </button>{" "}
                  <Link to="/register" className="btn btn-primary">
                    Реєстрація
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
