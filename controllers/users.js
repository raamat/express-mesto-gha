const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }

      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        return res.status(400).send({ message: ' Ошибка в введеных данных' });
      }
      res.status(500).send({ message: `Произошла ошибка в работе сервера ${err}` });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка в введенных данных' });
      }
      res.status(500).send({ message: `Произошла ошибка в работе сервера ${err}` });
    });
};
