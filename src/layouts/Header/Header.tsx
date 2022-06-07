import { memo, FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bulma';

type Props = {};

const routes = [
  {
    name: 'Home',
    path: '/',
  }, {
    name: 'People',
    path: '/people',
  },
];

export const Header: FC<Props> = memo(() => {
  const [currentPath, setCurrentPath] = useState('');

  return (
    <header className="tabs is-centered is-medium">
      <ul>
        {routes.map(({ name, path }) => (
          <li className={currentPath === path ? 'is-active' : ''} key={name}>
            <NavLink
              to={path}
              className={({ isActive }) => {
                if (isActive) {
                  setTimeout(() => setCurrentPath(path));
                }

                return 'link';
              }}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
});
