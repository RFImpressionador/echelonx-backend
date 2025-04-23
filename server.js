// Importa bibliotecas necessárias
const express = require("express"); // Servidor HTTP
const cors = require("cors"); // Permite acesso de outros domínios

const app = express(); // Cria o servidor Express
const PORT = process.env.PORT || 5000; // Porta padrão 5000 ou variável do ambiente Render

// Configurações de segurança e formatação
app.use(cors()); // Permite o frontend acessar
app.use(express.json()); // Aceita JSON no corpo da requisição

// Rota de teste para ver se o servidor está online
app.get("/", (req, res) => {
  res.send("EchelonX Backend rodando!"); // Mensagem simples para teste
});

// Rota de login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Validação simples de usuário e senha
  if (username === "admin" && password === "123") {
    return res.status(200).json({ message: "Login OK" });
  } else {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
