import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  person: Person;
}

export const PersonLink = ({ person }: Props) => {
  const { slug } = useParams();
  const link = slug ? `../${person.slug}` : `./${person.slug}`;

  return (
    <Link
      to={link}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
