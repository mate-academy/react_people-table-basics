export const Navigation = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" href="#/">
            Home
          </Link>

          <Link
            className="navbar-item has-background-grey-lighter"
            href="#/people"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};
