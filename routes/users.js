const userRoutes = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  validationGetUserById,
  validationUpdateUser,
  validationUpdateAvatar,
} = require('../middlewares/validations');

userRoutes.get('/users', auth, getUsers);
userRoutes.get('/users/:id', auth, validationGetUserById, getUserById);
userRoutes.patch('/users/me', auth, validationUpdateUser, updateUser);
userRoutes.patch('/users/me/avatar', auth, validationUpdateAvatar, updateAvatar);

module.exports = userRoutes;
