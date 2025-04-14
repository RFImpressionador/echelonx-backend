const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const authRoutes = require("./routes/authRoutes");

// Configurações básicas
app.use(cors());
app.use(express.json());

// Rota da API
app.use("/api", authRoutes);

// Servir arquivos estáticos (HTML, CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "frontend")));

// Rota padrão para abrir o site (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
