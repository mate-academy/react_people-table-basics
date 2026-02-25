// Barra de navegação com links para Home e People.
// Usa <NavLink> do react-router-dom que fornece a prop "isActive"
// para aplicar a classe "has-background-grey-lighter" no link da página atual.
// A lib "classnames" facilita a aplicação condicional de classes CSS.

import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        {/* Link "Home" — fica destacado quando a rota é exatamente "/" */}
        <NavLink
          className={({ isActive }) =>
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
          to="/"
        >
          Home
        </NavLink>

        {/* Link "People" — fica destacado em qualquer rota /people* */}
        <NavLink
          className={({ isActive }) =>
            classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })
          }
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  </nav>
);
