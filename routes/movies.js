const router = require('express').Router()
const unirest = require("unirest");

// var req = unirest("GET", "https://unogs-unogs-v1.p.rapidapi.com/api.cgi");

// req.headers({
// 	"x-rapidapi-key": "SIGN-UP-FOR-KEY",
// 	"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
// 	"useQueryString": true
// });

// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body);
// });

// GET /movies/search
router.get('/search', async (req, res, next) => {
  try {
    //await api query
  } catch (err) { next(err) }
})

// post route for /movies/votes

module.exports = router;
