const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const pgp = require("pg-promise")();
const db = pgp("postgres://name:pass@localhost:5432/database");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/api/data", async (req, res) => {
  //Запрос до БД
  try {
    const data = await db.any("SELECT * FROM layout"); //Запрос до СУБД
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/register", async (req, res) => {
  const { nickname, firstName, lastName, email, phone, birthDate, password } =
    req.body;

  try {
    await db.none(
      "INSERT INTO users (user_nickname, user_password, user_firstname, user_lastname, user_email, user_phone, user_birth, user_discount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [nickname, password, firstName, lastName, email, phone, birthDate, 5]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);

  try {
    // Запит до бази даних для отримання користувача за електронною поштою
    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );

    if (user && user.user_password === password) {
      // Користувач існує і пароль вірний
      res.json({ message: "Login successful", user });
    } else {
      // Користувача не знайдено або пароль невірний
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/orders", async (req, res) => {
  //Запрос до БД
  try {
    const data = await db.any('SELECT * FROM "order"'); //Запрос до СУБД
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
