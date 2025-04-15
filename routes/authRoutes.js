
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
  const { username, password } = req.body; // lógica de autenticação com Prisma

  try {
    const user = await prisma.users.findUnique({
      where: { username }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    if (user.status !== 'Aprovado') {
      return res.status(403).json({ message: 'Acesso pendente de aprovação' });
    }

    res.status(200).json({ message: 'Login bem-sucedido', role: user.role });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
