// получение данных пользователя
fetch("/user")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// обновление данных пользователя
const user = {
  name: "Новое имя",
  bio: "Новая биография",
  photo: "новое фото",
};

fetch("/user", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(user),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// создание новой карточки
const card = {
  id: 1,
  text: "Новая карточка",
};

fetch("/cards", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(card),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// удаление карточки
fetch("/cards/1", {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
