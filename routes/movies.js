const router = require('express').Router();
require('../secrets');


//GET /movies/search
// router.get('https://unogs-unogs-v1.p.rapidapi.com/api.cgi', async (req, res, next) => {
//   try {
//     const response = fetch("https://unogs-unogs-v1.p.rapidapi.com/api.cgi", {
//       "method": "GET",
//       "headers": {
//         "x-rapidapi-key": process.env.MOVIE_API_KEY,
//         "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
//       }
//     })
//     console.log(response)
//     res.json(response)
//   } catch (err) { next(err) }
// })

// post route for /movies/votes

module.exports = router;
