const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(session({
  secret: "echelon-secret",
  resave: false,
  saveUninitialized: true,
}));

// Login simples
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123") {
    req.session.user = username;
    return res.status(200).json({ message: "Login OK" });
  } else {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// Teste simples para verificar se o backend está online
app.get("/", (req, res) => {
  res.send("Backend está rodando!");
});
