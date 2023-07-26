const cardRoutes = require('express').Router();
const { getCards, createCard, cardDelete } = require('../controllers/cards');

cardRoutes.get('/cards', getCards);
cardRoutes.post('/cards', createCard);
cardRoutes.delete('/cards/:id', cardDelete);

module.exports = cardRoutes;
