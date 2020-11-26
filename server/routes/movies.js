const router = require('express').Router();
const { Movie } = require('../db');

// post route for /movies/:title/upvotes
router.post('/:title/upvotes', async (req, res, next) => {
  try {
    const title = req.params.title;
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


// post route for /movies/:title/downvotes downvotes
router.post('/:title/downvotes', async (req, res, next) => {
  try {
    const title = req.params.title;
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
