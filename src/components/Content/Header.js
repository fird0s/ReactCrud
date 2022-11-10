import { Routes, Route, Link } from "react-router-dom";

function Header() {
  return (
    <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="http://localhost:3000/">
                <h1 className="title is-4">ReactCrud.</h1>
            </a>
        
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">
                <Link to="/">Home</Link>
              </a>
              {/* users */}
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Users
                </a>
                <div className="navbar-dropdown">
                  <Link to="/users" className="navbar-item">All User</Link>
                  <Link to="/users/add" className="navbar-item">Add User</Link>
                </div>
              </div>
              {/* .users */}
              {/* TODO */}
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Todos
                </a>
                <div className="navbar-dropdown">
                  <Link to="/todos" className="navbar-item">Todos</Link>
                  <Link to="/todos/add" className="navbar-item">Add Todo</Link>
                </div>
              </div>
              {/* .TODO */}
            </div>
        
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-light">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    
  )
}

export default Header;
