import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './App.scss';
import { Person } from './types';

const linkMaker = (person: Person) => {
  return `${person.name.toLocaleLowerCase().split(' ').join('-')}-${person.born}`;
};

export const PersonLink: React.FC<{ person: Person }> = ({ person }) => (
  <Link
    className={classNames({
      'has-text-danger': person.sex === 'f',
    })}
    to={`/people/${linkMaker(person)}`}
  >
    {person.name}
  </Link>
);
