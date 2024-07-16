// Shop.js

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Shop = ({ setSelected, userData, cart }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  // console.log(cart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    setSelected(item);
    navigate("/product");
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-light p-3">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <button
                className="btn btn-outline-dark d-flex align-items-center"
                onClick={() => navigate("/user")}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Felis_silvestris_silvestris.jpg"
                  alt="User"
                  className="img-fluid rounded-circle me-2"
                  style={{ width: "30px", height: "30px" }}
                />
                {userData.user_nickname}
              </button>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-dark d-flex align-items-center"
                onClick={() => navigate("/orders")}
              >
                <img
                  src="https://grandcarp.com.ua/image/catalog/ZAKAZ/backet.png.pagespeed.ce.s1yxsMulaS.png"
                  alt="User"
                  className="img-fluid rounded-circle me-2"
                  style={{ width: "30px", height: "30px" }}
                />
                Замовлення
              </button>
            </div>
            <div className="col-md-5 text-center">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-outline-dark d-flex align-items-center"
                onClick={() => navigate("/cart")}
              >
                <img
                  src="https://img.freepik.com/premium-vector/shopping-cart-icon-isolated-on-white-background-vector-illustration_736051-305.jpg"
                  alt="User"
                  className="img-fluid rounded-circle me-2"
                  style={{ width: "30px", height: "30px" }}
                />
                Кошик
                <span className="badge bg-secondary">{cart.length}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Item Cards */}
      <div className="container mt-5">
        <div className="row">
          {items.map((item) => (
            <div className="col-md-4 mb-4" key={item.layout_id}>
              <div className="card">
                <img
                  src={
                    "https://koloristika.com.ua/wp-content/uploads/2012/07/mug-11-300.jpg"
                  }
                  className="card-img-top"
                  alt={`Item ${item.layout_id}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.layout_name}</h5>
                  <p className="card-text">Ціна: ${item.layout_cost}</p>
                  <p className="card-text">Рейтинг: {item.layout_rating}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(item)}
                  >
                    Взяти шаблон
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
