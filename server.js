// Importa bibliotecas necessárias
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const authRoutes = require("./routes/authRoutes"); // Rotas de autenticação

// Configurações básicas
app.use(cors({
  origin: 'https://echelonx-painel.onrender.com'
})); // Permite comunicação entre frontend e backend
app.use(express.json()); // Aceita JSON

// Rotas da API
app.use("/api", authRoutes); // Todas as rotas de API começam com /api

// Servir arquivos estáticos (frontend)
app.use(express.static(path.join(__dirname, "frontend")));

// Rota principal para abrir o site (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
