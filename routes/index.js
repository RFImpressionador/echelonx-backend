const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ status: 'Backend EchelonX funcionando.' });
});

module.exports = router;
