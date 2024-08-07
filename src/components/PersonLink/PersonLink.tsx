import cn from 'classnames';
import { Person } from '../../types/Person';
import { NavLink } from 'react-router-dom';

const FEMALE_SEX = 'f';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <NavLink
      className={cn({ 'has-text-danger': person.sex === FEMALE_SEX })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </NavLink>
  );
};
