import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 text-center">
            <img
              src="https://img.freepik.com/free-vector/shopping-mall-outside-composition-mall-building-with-tags-and-headlines-of-shops-on-the-wall_1284-58788.jpg?w=1380&t=st=1699985502~exp=1699986102~hmac=3fe107988e103da7b6df46b1e2c63912665fd015969471edcf70fa50f510b296"
              alt="Shopping Mall"
              className="img-fluid"
              style={{ height: "50vh" }}
            />
            <h1 className="display-4">Ласкаво просимо в наш магазин</h1>
            <p className="lead">
              Досліджуйте нашу колекцію неймовірних шаблонів та знаходьте
              ідеальний для своїх потреб.
            </p>
            <p className="lead">
              Почніть, шукаючи бажаний шаблон або переглядайте наші
              рекомендовані елементи.
            </p>
            <p className="lead">
              Якщо у вас є які-небудь питання або вам потрібна допомога, не
              соромтеся зв'язатися з нами.
            </p>
            <div className="mt-4">
              <Link to="/login" className="btn btn-primary me-3">
                Вхід
              </Link>
              {""}
              <Link to="/register" className="btn btn-primary">
                Реєстрація
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
