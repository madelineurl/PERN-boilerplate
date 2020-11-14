const html = require("html-template-tag");

module.exports = (content) => html`<!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Movie API</title>
      <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
      <link href="/stylesheets/style.css" rel="stylesheet">
    </head>
    <body>
      <div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nav-items">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/wiki">wikistack</a>
          </div>
          <div id="nav-items" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li><a href="/wiki/">index</a></li>
              <li><a href="/wiki/add">write</a></li>
              <li><a href="/users">users</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container content">
        $${content}
      </div>
      <hr/>
      <div id="footer" class="container text-muted">
        Movie API by Madeline Higgins
      </div>
    </body>
  </html>`;
