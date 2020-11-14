const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Pages</h3>
  <hr>
  <form method="GET" action="/movies/search">
    <input type="text" name="search" />
    <button type="submit">Search</button>
  </form>
  <hr>
  <ul class="list-unstyled">
    <ul>
      <!-- PLACEHOLDER LIST OF PAGES -->
    </ul>
  </ul>`);
