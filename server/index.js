const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { db } = require('./db');

let app = express();
module.exports = app; // this line is only used to make testing easier.

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/movies', require('./routes/movies'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', function (req, res, next) {
	//console.log('hello from JS!');
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.use((err, req, res, next) => {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const PORT = 8000;

const init = async () => {
  await db.sync();

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
