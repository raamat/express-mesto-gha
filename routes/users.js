const userRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRoutes.get('/users', auth, getUsers);
userRoutes.get('/users/:id', auth, getUserById);
userRoutes.patch('/users/me', auth, updateUser);
userRoutes.patch('/users/me/avatar', auth, updateAvatar);

module.exports = userRoutes;
