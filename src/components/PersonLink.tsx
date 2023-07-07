import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <a
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
      href={`#/people/${person.slug}`}
    >
      {person.name}
    </a>
  );
};
