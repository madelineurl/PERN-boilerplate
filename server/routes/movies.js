const router = require('express').Router();
const { Movie } = require('../db');

router.get('/:title/data', async (req, res, next) => {
  try {
    const title = req.params.title;
    const singleMovie = await Movie.findOne({
      where: { title }
    });

    if (singleMovie) {
      res.json(singleMovie);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.error(err);
  }
});

// post route for /movies/:title/upvote
router.post('/:title/upvote', async (req, res, next) => {
  try {
    let title = req.params.title;
    // format the title
    // title = title
    //   .split('-')
    //   .map(word => word[0].toUpperCase().concat(word.slice(1)))
    //   .join(' ');
    // find or create a movie with the title in the DB
    const [singleMovie, wasCreated] = await Movie.findOrCreate({
      where: { title }
    });
    const upvotes = singleMovie.upvotes + 1;
    await singleMovie.update({ upvotes });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});


// post route for /movies/:title/downvote
router.post('/:title/downvote', async (req, res, next) => {
  try {
    let title = req.params.title;
    // title = title
    // .split('-')
    // .map(word => word[0].toUpperCase().concat(word.slice(1)))
    // .join(' ');
    const [singleMovie, wasCreated] = await Movie.findOrCreate({
      where: { title }
    });
    const downvotes = singleMovie.downvotes + 1;
    await singleMovie.update({ downvotes });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
