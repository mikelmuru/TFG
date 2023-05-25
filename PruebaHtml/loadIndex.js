const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(5000, () => {
  console.log('Servidor iniciado en http://localhost:5000');
});