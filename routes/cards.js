const cardRoutes = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getCards, createCard, cardDelete, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard, validationCardId,
} = require('../middlewares/validations');

cardRoutes.get('/cards', auth, getCards);
cardRoutes.post('/cards', auth, validationCreateCard, createCard);
cardRoutes.delete('/cards/:cardId', auth, validationCardId, cardDelete);
cardRoutes.put('/cards/:cardId/likes', auth, validationCardId, likeCard);
cardRoutes.delete('/cards/:cardId/likes', auth, validationCardId, dislikeCard);

module.exports = cardRoutes;
