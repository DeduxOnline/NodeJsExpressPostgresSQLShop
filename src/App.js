import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login";
import Register from "./register";
import Shop from "./shop";
import WelcomePage from "./welcome";
import ProfilePage from "./userpage";
import ProductDetailPage from "./itempage";
import ShoppingCartPage from "./cart";
import OrderList from "./order";

function App() {
  const [userData, setUserData] = useState({});
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState([]);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login setUserData={setUserData} />} />
          <Route
            path="/register"
            element={<Register setUserData={setUserData} />}
          />
          <Route
            path="/shop"
            element={
              <Shop userData={userData} setSelected={setSelected} cart={cart} />
            }
          />
          <Route
            path="/user"
            element={<ProfilePage userProfile={userData} />}
          />
          <Route
            path="/product"
            element={
              <ProductDetailPage
                product={selected}
                cart={cart}
                setCart={setCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ShoppingCartPage cartItems={cart} setCartItems={setCart} />
            }
          />
          <Route path="/orders" element={<OrderList />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
