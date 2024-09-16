import { Link } from 'react-router-dom';
import { Person } from './types';
import cn from 'classnames';

enum Sex {
  Male = 'm',
  Female = 'f',
}

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({
        'has-text-danger': sex === Sex.Female,
      })}
    >
      {name}
    </Link>
  );
};
