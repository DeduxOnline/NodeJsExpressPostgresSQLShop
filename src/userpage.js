import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfilePage = ({ userProfile }) => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg"
          alt="Avatar"
          className="img-fluid rounded-circle"
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div>
        <h2 className="mb-4">Профіль користувача</h2>
        <p>
          <strong>Ім'я:</strong> {userProfile.user_firstname}
        </p>
        <p>
          <strong>Прізвище:</strong> {userProfile.user_lastname}
        </p>
        <p>
          <strong>Електронна пошта:</strong> {userProfile.user_email}
        </p>
        <p>
          <strong>Номер телефону:</strong> {userProfile.user_phone}
        </p>
        <p>
          <strong>Дата народження:</strong> {userProfile.user_birth}
        </p>
        <p>
          <strong>Знижка:</strong> {userProfile.user_discount}%
        </p>
      </div>
      <div className="mt-4">
        <Link to="/shop" className="btn btn-primary me-3">
          Назад в магазин
        </Link>
        <Link to="/" className="btn btn-danger">
          Вихід
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
