import { NavLink } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person?: Person | null;
  name: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!person) {
    return <>{name || '-'}</>;
  }

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </NavLink>
  );
};
