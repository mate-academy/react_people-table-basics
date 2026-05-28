import { Person } from '../../types/Person';
import classNames from 'classnames';

interface PersonLinkProps {
  person: Person | null;
}

export function PersonLink({ person }: PersonLinkProps) {
  if (!person) {
    return '-';
  }

  const isFemale = person.sex === 'f';

  return (
    <a
      href={`#/people/${person.slug}`}
      className={classNames({
        'has-text-danger': isFemale,
      })}
    >
      {person.name}
    </a>
  );
}
