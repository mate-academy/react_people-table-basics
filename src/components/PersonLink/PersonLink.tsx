import { Person } from '../../types';
import classNames from 'classnames';

interface PersonLinkProps {
  person: Person | null;
  name: string | null;
}

export const PersonLink = ({ person, name }: PersonLinkProps) => {
  if (!person) {
    if (!name) {
      return <>-</>;
    }
    return <>{name}</>;
  }

  return (
    <a
      href={`#/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </a>
  );
};
