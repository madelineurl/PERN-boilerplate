const html = require("html-template-tag");
const layout = require("./layout");
require('../secrets')

const handleClick = (event) => {
  try {
    event.preventDefault();
    console.log('clicked')
    const response = fetch("https://unogs-unogs-v1.p.rapidapi.com/api.cgi", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": process.env.MOVIE_API_KEY,
        "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
      }
    })
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

module.exports = () => layout(html`
  <h3>Pages</h3>
  <hr>
  <form>
    <input type="text" name="search" />
    <button onclick=${handleClick} type="submit">Search</button>
  </form>
  <hr>
  <ul class="list-unstyled">
    <ul>
      <!-- PLACEHOLDER LIST OF PAGES -->
    </ul>
  </ul>`);
