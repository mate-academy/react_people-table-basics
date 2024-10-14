import { NavLink } from "react-router-dom"
import { getNavLinkClass } from "../types/utils/getNavLinkClass"

export const NavBar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavLinkClass} to="/">
            Home
          </NavLink>
          <NavLink className={getNavLinkClass} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
