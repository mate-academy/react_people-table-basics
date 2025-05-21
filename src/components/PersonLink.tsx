import { NavLink } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

interface Props {
  person?: Person;
}

const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return <span>-</span>;
  }

  const isFemale = person.sex === 'f';

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={classNames('has-text-weight-bold', {
        'has-text-danger': isFemale,
      })}
    >
      {person.name}
    </NavLink>
  );
};

export default PersonLink;
