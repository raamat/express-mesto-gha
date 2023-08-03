const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');

const app = express();
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '64bce2d16d5d6d4aa8429b81',
  };

  next();
});

app.use(userRoutes);
app.use(cardRoutes);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Неправильный путь' });
});

async function main() {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  app.listen(PORT, () => {
    console.log(`Слушаем порт ${PORT}`);
  });
}

main();
