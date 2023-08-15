const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const AuthenticationError = require('../errors/AuthenticationError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');

const { SECRET_KEY } = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    // .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
    .catch(() => next(new ServerError()));
};

module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      return next(new NotFoundError('Текущий пользователь не найден'));
    }
    res.status(200).send(user);
  })
  .catch((err) => {
    if (err instanceof mongoose.CastError) {
      // return res.status(400).send({ message: 'Ошибка в введеных данных' });
      return next(new BadRequestError());
    }
    // res.status(500).send({ message: `Произошла ошибка в работе сервера ${err}` });
    next(err);
  });

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        // return res.status(404).send({ message: 'Нет пользователя с таким id' });
        return next(new NotFoundError('Нет пользователя с таким id'));
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        // return res.status(400).send({ message: 'Ошибка в введеных данных' });
        return next(new BadRequestError());
      }
      // res.status(500).send({ message: `Произошла ошибка в работе сервера ${err}` });
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
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
            // return res.status(400).send({ message: `Ошибка в введенных данных ${err}` });
            return next(new BadRequestError());
          }
          if (err.code === 1100) {
            // return res.status(409).send({ message: 'Польз с таким email уже зарегистрирован' });
            return next(new ConflictError());
          }
          // res.status(500).send({ message: `Произошла ошибка в работе сервера ${err}` });
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
    // .catch((err) => {
    //  res
    //    .status(401)
    //    .send({ message: err.message });
    // });
    .catch(() => next(new AuthenticationError()));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // return res.status(400).send({ message: 'Ошибка в введенных данных' });
        return next(new BadRequestError());
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        // return res.status(404).send({ message: 'Нет пользователя с таким id' });
        return next(new NotFoundError('Нет пользователя с таким id'));
      }
      // res.status(500).send({ message: `Произошла ошибка в работе сервера ${err}` });
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        // return res.status(404).send({ message: 'Нет пользователя с таким id' });
        return next(new NotFoundError('Нет пользователя с таким id'));
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // return res.status(400).send({ message: `Ошибка в введенных данных ${err}` });
        next(new BadRequestError());
      }
      // res.status(500).send({ message: `Произошла ошибка в работе сервера ${err}` });
      next();
    });
};
