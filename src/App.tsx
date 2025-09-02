import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    {/* Навігаційна панель */}
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {/* Посилання на головну сторінку */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
          >
            Home
          </NavLink>
          {/* Посилання на сторінку People */}
          <NavLink
            to="/people"
            className={({ isActive }) =>
              isActive
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        {/* Маршрутизація сторінок */}
        <Routes>
          {/* Головна сторінка */}
          <Route path="/" element={<HomePage />} />

          {/* Редірект з /home на / без збереження історії */}
          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* Сторінка People (зі списком людей) */}
          <Route path="/people" element={<PeoplePage />} />
          {/* Той самий компонент PeoplePage для маршруту з параметром slug */}
          <Route path="/people/:slug" element={<PeoplePage />} />

          {/* Сторінка не знайдена */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
