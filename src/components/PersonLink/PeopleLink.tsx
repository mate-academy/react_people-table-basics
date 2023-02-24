import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <NavLink
    to={`../${person.slug}`}
    className={() => (
      classNames({
        'has-text-danger': person.sex === 'f',
      })
    )}
  >
    {person.name}
  </NavLink>
);
