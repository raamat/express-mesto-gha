const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

const { SECRET_KEY } = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      return next(new NotFoundError('Текущий пользователь не найден'));
    }
    res.status(200).send(user);
  })
  .catch(next);

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Нет пользователя с таким id'));
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return next(new BadRequestError('Ошибка в введеных данных'));
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(201).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(new BadRequestError('Ошибка в введеных данных'));
        }
        if (err.code === 11000) {
          return next(
            new ConflictError('Пользователь с таким email уже зарегистрирован'),
          );
        }
        next(err);
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const payload = { _id: user._id };
      const token = JWT.sign(payload, SECRET_KEY, { expiresIn: '7d' });

      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка в введеных данных'));
      } else
        if (err instanceof mongoose.Error.DocumentNotFoundError) {
          next(new NotFoundError('Нет пользователя с таким id'));
        } else { next(err); }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Ошибка в введеных данных'));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Нет пользователя с таким id'));
      }
      next(err);
    });
};
