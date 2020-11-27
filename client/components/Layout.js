import React from "react";

const Layout = ({ children }) => {
  return (
    <>
        <div className="navbar navbar-fixed-top navbar-inverse" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#nav-items">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/wiki">movies</a>
            </div>
            {/* <div id="nav-items" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
              </ul>
            </div> */}
          </div>
        </div>
      <hr/>
      <hr/>
      <div className="container content">
          {children}
      </div>
      <hr/>
      <div id="footer" className="container text-muted">
        Movie API by Madeline Higgins
      </div>
    </>
  )
}

export default Layout;
