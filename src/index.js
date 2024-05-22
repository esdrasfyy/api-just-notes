const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();
require("./config/dbConfig");

const PORT = 3333;
app.use(cors());
app.use(express.json());
app.use(routes);

try {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em ${PORT}`);
  });
} catch (error) {
  console.error("Erro ao iniciar o servidor:", error);
}
