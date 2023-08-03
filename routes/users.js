const userRoutes = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRoutes.get('/users', getUsers);
userRoutes.get('/users/:id', getUserById);
userRoutes.patch('/users/me', updateUser);
userRoutes.patch('/users/me/avatar', updateAvatar);

module.exports = userRoutes;
