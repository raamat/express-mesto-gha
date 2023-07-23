const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const routes = require("./routes/users");

const app = express();
app.use(express.json());

app.use(routes);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  app.listen(PORT, () => {
    console.log(`Слушаем порт ${PORT}`);
  });
}

main();
