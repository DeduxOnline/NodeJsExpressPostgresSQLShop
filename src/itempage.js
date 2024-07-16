import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const ProductDetailPage = ({ product, cart, setCart }) => {
  const navigate = useNavigate();
  // Стан для збереження даних товару
  const [userImages, setUserImages] = useState([]);
  // Функція для додавання URL зображень користувача
  const handleAddUserImage = (imageUrl) => {
    setUserImages((prevImages) => [...prevImages, imageUrl]);
  };

  // Стан для обраного кольору користувача
  const [selectedColor, setSelectedColor] = useState(0);
  // Функція для зміни кольору користувацького зображення
  const handleChangeColor = (e) => {
    setSelectedColor(e.target.value);
  };
  // Функція для видалення користувача
  const handleDeleteUserImage = (index) => {
    const updatedImages = [...userImages];
    updatedImages.splice(index, 1);
    setUserImages(updatedImages);
  };
  // Функція для додавання в кошик
  const handleAddToCart = (item) => {
    console.log("item successful added:", item);
    setCart([...cart, item]);
    navigate("/shop");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Інформація про товар */}
        <div className="col-md-4">
          <h2 className="mb-4">{product.layout_name}</h2>
          <div>
            <p>
              <strong>Ціна:</strong> ${product.layout_cost}
            </p>
            <p>
              <strong>Наявна кількість:</strong> {product.layout_count}
            </p>
            <p>
              <strong>Вага:</strong> {product.layout_weight} кг
            </p>
            <p>
              <strong>Ширина:</strong> {product.layout_width} см
            </p>
            <p>
              <strong>Довжина:</strong> {product.layout_length} см
            </p>
            <p>
              <strong>Висота:</strong> {product.layout_height} см
            </p>
            <p>
              <strong>Рейтинг:</strong> {product.layout_rating}
            </p>
          </div>
        </div>

        {/* Зображення товару та користувача */}
        <div className="col-md-4 position-relative">
          <img
            src={
              "https://koloristika.com.ua/wp-content/uploads/2012/07/mug-11-300.jpg"
            }
            alt={product.layout_name}
            className="img-fluid mb-4"
          />
          {userImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`User Image ${index + 1}`}
              className="img-fluid user-image"
              style={{
                width: "30vh",
                height: "30vh",
                filter: `hue-rotate(${selectedColor}deg)`,
              }}
            />
          ))}
        </div>

        {/* Вибір кольору та його зміна */}
        <div className="col-md-4">
          <div className="mt-4">
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteUserImage(0)}
            >
              Видалити
            </button>
            <input
              type="text"
              placeholder="Вставте URL свого зображення"
              className="form-control mt-2"
              onChange={(e) => handleAddUserImage(e.target.value)}
            />
            <label className="mt-2">Вибір кольору:</label>
            <input
              type="range"
              min="0"
              max="360"
              value={selectedColor}
              onChange={handleChangeColor}
              className="form-range mt-2"
            />
          </div>

          {/* Кнопка назад */}
          <div className="mt-4">
            <button
              className="btn btn-success me-2"
              onClick={() => handleAddToCart(product)}
            >
              Додати до кошика
            </button>
            <Link to="/shop" className="btn btn-primary">
              Назад в магазин
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
