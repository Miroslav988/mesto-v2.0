import type { NextApiRequest, NextApiResponse } from "next";

// хранилище данных
interface User {
  name: string;
  bio: string;
  photo: string;
}

interface Card {
  id: string;
  // другие свойства карточки
}

const data: { user: User; cards: Card[] } = {
  user: {
    name: "Новый пользователь",
    bio: "Новая биография",
    photo: "новое фото",
  },
  cards: [],
};

// обработчик запроса на получение данных пользователя
export async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return res.json(data.user);
}

// обработчик запроса на обновление данных пользователя
export async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { name, bio, photo } = req.body;
  data.user.name = name;
  data.user.bio = bio;
  data.user.photo = photo;
  return res.json(data.user);
}

// обработчик запроса на получение всех карточек
export async function getCards(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return res.json(data.cards);
}

// обработчик запроса на создание новой карточки
export async function createCard(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const card: Card = req.body;
  data.cards.push(card);
  return res.json(card);
}

// обработчик запроса на удаление карточки
export async function deleteCard(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const id = req.query.id;
  const card = data.cards.find((card) => card.id === id);
  if (!card) {
    return res.status(404).json({ message: "Карточка не найдена" });
  } else {
    data.cards = data.cards.filter((card) => card.id !== id);
    return res.json({ message: "Карточка удалена" });
  }
}

// создание API-роутов
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "GET":
      if (req.url === "/user") {
        return getUser(req, res);
      } else if (req.url === "/cards") {
        return getCards(req, res);
      }
      break;
    case "PUT":
      if (req.url === "/user") {
        return updateUser(req, res);
      }
      break;
    case "POST":
      if (req.url === "/cards") {
        return createCard(req, res);
      }
      break;
    case "DELETE":
      if (req.url === "/cards") {
        return deleteCard(req, res);
      }
      break;
    default:
      return res.status(405).json({ message: "Метод не поддерживается" });
  }
}
