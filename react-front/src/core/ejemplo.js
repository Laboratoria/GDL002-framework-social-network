<nav classNameName="navbar navbar-expand-lg navbar-light bg-light">
 
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
        Home 
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/users")} to="/users">
        Users
        </Link>
      </li>
      <li className="nav-item">
        <Link to={`/post/create`} 
        style={isActive(history, `/post/create`)}  className="nav-link" href="#">
        Create Post
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link"
            style={isActive(history, "/signin")}
            to="/signin">
            Sign In
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link"
            style={isActive(history, "/signup")}
            to="/signin">
            Sign Up
        </Link>
      </li>
    </ul>
  </div>
</nav>