const cardRoutes = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getCards, createCard, cardDelete, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard, validationCardId,
} = require('../middlewares/validations');

cardRoutes.get('/', auth, getCards);
cardRoutes.post('/', auth, validationCreateCard, createCard);
cardRoutes.delete('/:cardId', auth, validationCardId, cardDelete);
cardRoutes.put('/:cardId/likes', auth, validationCardId, likeCard);
cardRoutes.delete('/:cardId/likes', auth, validationCardId, dislikeCard);

module.exports = cardRoutes;
