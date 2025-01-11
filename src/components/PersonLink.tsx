import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  name: string;
  sex: 'm' | 'f';
  people: Person[];
}

function makeSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export const PersonLink: FC<PersonLinkProps> = ({ name, sex, people }) => {
  const isExistingPerson = people.some(
    person => makeSlug(person.name) === makeSlug(name),
  );

  if (isExistingPerson) {
    const slug = makeSlug(name);

    return (
      <Link
        to={`/people/${slug}`}
        className={sex === 'f' ? 'has-text-danger' : ''}
      >
        {name}
      </Link>
    );
  }

  return <span className={sex === 'f' ? 'has-text-danger' : ''}>{name}</span>;
};
