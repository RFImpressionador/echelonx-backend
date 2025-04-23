// Importa bibliotecas necessárias
const express = require("express"); // Servidor HTTP
const session = require("express-session"); // Gerenciar sessão de login
const cors = require("cors"); // Permite que o frontend acesse o backend de outro domínio

const app = express(); // Cria o servidor
const PORT = process.env.PORT || 5000; // Porta padrão 5000 ou a do ambiente (Render usa variável)

app.use(cors()); // Permite comunicação entre front e back
app.use(express.json()); // Aceita JSON no corpo das requisições
app.use(
  session({
    secret: "echelon-secret", // Senha da sessão (pode mudar pra mais segura)
    resave: false,
    saveUninitialized: true,
  })
);

// Rota de login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123") {
    // Verifica login simples
    req.session.user = username; // Salva usuário na sessão
    return res.status(200).json({ message: "Login OK" }); // Responde sucesso
  } else {
    return res.status(401).json({ error: "Credenciais inválidas" }); // Responde erro
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
