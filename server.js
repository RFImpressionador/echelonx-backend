// Importa as bibliotecas necessárias
const express = require("express");
const session = require("express-session"); // Gerencia sessão do usuário
const cors = require("cors"); // Permite comunicação entre domínios

const app = express(); // Cria o servidor
const PORT = process.env.PORT || 5000; // Define a porta

// Configuração do CORS (libera só para o frontend bonito)
app.use(cors({
  origin: 'https://echelonx-painel.onrender.com', // Libera SÓ para o painel bonito
  credentials: true // Permite enviar cookies e sessão
}));

app.use(express.json()); // Permite receber JSON

// Configura a sessão (armazena login)
app.use(session({
  secret: "echelon-secret", // Senha da sessão (pode mudar pra mais segura depois)
  resave: false,
  saveUninitialized: true
}));

// Rota de login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Validação simples (pode trocar depois)
  if (username === "admin" && password === "123") {
    req.session.user = username; // Salva usuário na sessão
    return res.status(200).json({ message: "Login OK" }); // Responde sucesso
  } else {
    return res.status(401).json({ error: "Credenciais inválidas" }); // Responde erro
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
