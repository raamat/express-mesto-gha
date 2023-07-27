const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64bce2d16d5d6d4aa8429b81',
  };

  next();
});

app.use(userRoutes);
app.use(cardRoutes);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  app.listen(PORT, () => {
    console.log(`Слушаем порт ${PORT}`);
  });
}

main();
