const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// хранилище данных
const data = {
  user: {
    name: "Новый пользователь",
    bio: "Новая биография",
    photo: "новое фото",
  },
  cards: [],
};

// обработчик запроса на получение данных пользователя
app.get("/user", (req, res) => {
  res.json(data.user);
});

// обработчик запроса на обновление данных пользователя
app.put("/user", (req, res) => {
  const { name, bio, photo } = req.body;
  data.user.name = name;
  data.user.bio = bio;
  data.user.photo = photo;
  res.json(data.user);
});

// обработчик запроса на получение всех карточек
app.get("/cards", (req, res) => {
  res.json(data.cards);
});

// обработчик запроса на создание новой карточки
app.post("/cards", (req, res) => {
  const card = req.body;
  data.cards.push(card);
  res.json(card);
});

// обработчик запроса на удаление карточки
app.delete("/cards/:id", (req, res) => {
  const id = req.params.id;
  const card = data.cards.find((card) => card.id === id);
  if (!card) {
    res.status(404).json({ message: "Карточка не найдена" });
  } else {
    data.cards = data.cards.filter((card) => card.id !== id);
    res.json({ message: "Карточка удалена" });
  }
});

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
