const cardRoutes = require('express').Router();
const {
  getCards, createCard, cardDelete, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', createCard);
cardRoutes.delete('/cards/:id', cardDelete);
cardRoutes.put('/cards/:cardId/likes', likeCard);
cardRoutes.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRoutes;
