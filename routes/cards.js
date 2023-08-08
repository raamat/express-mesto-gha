const cardRoutes = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getCards, createCard, cardDelete, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard, validationCardDelete,
} = require('../middlewares/validations');

cardRoutes.get('/cards', auth, getCards);
cardRoutes.post('/cards', auth, validationCreateCard, createCard);
cardRoutes.delete('/cards/:id', auth, validationCardDelete, cardDelete);
cardRoutes.put('/cards/:cardId/likes', auth, likeCard);
cardRoutes.delete('/cards/:cardId/likes', auth, dislikeCard);

module.exports = cardRoutes;
