import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShoppingCartPage = ({ cartItems, setCartItems }) => {
  console.log("cartItems", cartItems);
  // Логіка для видалення товару з кошика
  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    // Тут ви також можете оновити дані на сервері або в локальному сховищі
  };

  // Логіка для оновлення кількості товарів в кошику
  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    // Тут також оновлюєте дані на сервері або в локальному сховищі
  };

  // Обчислення загальної суми замовлення
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.layout_cost * (item.quantity ?? 1),
      0
    );
  };

  return (
    <div className="container mt-5">
      <h2>Кошик</h2>
      <ul className="list-group">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex flex-column">
              <h5>{item.layout_name}</h5>
              <p className="text-muted">Ціна: ${item.layout_cost}</p>
            </div>
            <div className="d-flex align-items-center">
              <span className="me-2">Кількість:</span>
              <input
                type="number"
                value={item.quantity ?? 1}
                onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                className="form-control"
                style={{ width: "60px" }}
              />
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Видалити
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p>Загальна сума: ${calculateTotal()}</p>
      <Link to="/checkout" className="btn btn-primary">
        Оформити замовлення
      </Link>
      <Link to="/shop" className="btn btn-primary">
        Назад в магазин
      </Link>
    </div>
  );
};

export default ShoppingCartPage;
