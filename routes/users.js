const userRoutes = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  validationGetUserById,
  validationUpdateUser,
  validationUpdateAvatar,
} = require('../middlewares/validations');

userRoutes.get('/', auth, getUsers);
userRoutes.get('/me', auth, getCurrentUser);
userRoutes.get('/:id', auth, validationGetUserById, getUserById);
userRoutes.patch('/me', auth, validationUpdateUser, updateUser);
userRoutes.patch('/me/avatar', auth, validationUpdateAvatar, updateAvatar);

module.exports = userRoutes;
