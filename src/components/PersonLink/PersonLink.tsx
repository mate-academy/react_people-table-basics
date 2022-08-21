import cn from 'classnames';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
  onSelect: (person: Person) => void;
}

export const PersonLink: FC<Props> = memo(({ person, onSelect }) => (
  <Link
    className={cn({ 'has-text-danger': person.sex === 'f' })}
    to={`/people/${person.slug}`}
    onClick={() => onSelect(person)}
  >
    {person.name}
  </Link>
));
