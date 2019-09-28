const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Modulo is listening on port ${port}!`);
});

app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.resolve(__dirname, '..', 'public') });
});
