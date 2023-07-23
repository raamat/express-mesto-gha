const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: `Произошла ошибка ${err}` }));
} 

module.exports.getUserId = (req, res) => {
  if (!users[req.params.id]) {
    res.send(`Такого пользователя не существует`);
    return;
  }
  
  const { name, about, avatar } = users[req.params.id];

  res.send(name, about, avatar);
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` })); 
};
