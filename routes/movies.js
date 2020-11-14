const router = require('express').Router()

// GET /movies/search
router.get('/search', async (req, res, next) => {
  try {
    //await api query
  } catch (err) { next(err) }
})

// post route for /movies/votes

module.exports = router;
