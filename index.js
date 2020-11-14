'use strict';

const express = require('express');
const morgan = require('morgan');
const { db } = require('./db');
const main = require('./views/main');

let app = express();
module.exports = app; // this line is only used to make testing easier.

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('./routes/movies'))

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send(':( Internal Server Error :(');
// });

app.get('/', (req, res) => {
  res.send(main());
});

const PORT = 3000;

const init = async () => {
  await db.sync({force: true});

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`)
  });
};

init();
