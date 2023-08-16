const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { errors } = require('celebrate');
const router = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');

const app = express();
app.use(express.json());

app.use(helmet());

app.use(router);

app.use(errors());

app.use(handleErrors);

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
