// Register.js

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = ({ setUserData }) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPass] = useState("");

  const handleRegister = async () => {
    try {
      // Об'єкт з даними користувача для відправки на сервер
      const userData = {
        nickname,
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        password, // Зауважте, що тут пароль передається як 'password'
        // Додайте інші дані користувача за необхідності
      };
      console.log("userData", userData);
      // Відправка POST-запиту на сервер
      const response = await axios.post(
        "http://localhost:5000/api/register",
        userData
      );

      // Обробка відповіді з сервера (якщо потрібно)
      console.log("Registration successful:", response.data);
      setUserData(userData);
      navigate("/shop");
    } catch (error) {
      console.error("Registration error:", error);
      // Обробка помилок, якщо вони виникнуть
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Реєстрація</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="nickname" className="form-label">
                    Псевдонім
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Ім'я
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Призвище
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Почта
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Пароль
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Телефон
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="birthDate" className="form-label">
                    Дата народження
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthDate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <Link to="/login" className="btn btn-primary me-3">
                    Вхід
                  </Link>
                  {""}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRegister}
                  >
                    Реєстрація
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
