import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PeopleLink: React.FC<Props> = ({ person }) => {
  return (
    <>
      <NavLink
        to={`${person.slug}`}
        className={classNames({ 'has-text-danger': person.sex === 'f' })}
      >
        {person.name}
      </NavLink>
    </>
  );
};
