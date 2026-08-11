import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
  people: Person[];
  selectedSlug?: string;
};

export const PersonLink = ({
  person,
  people,
  selectedSlug,
}: Props) => {
  const isWoman = person.sex === 'f';
  const isSelected = person.slug === selectedSlug;

  const mother = people.find(
    p => p.name === person.motherName,
  );

  const father = people.find(
    p => p.name === person.fatherName,
  );

  return (
    <tr
      data-cy="person"
      className={isSelected ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={isWoman ? 'has-text-danger' : 'has-text-link'}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>

      <td>{person.born}</td>

      <td>{person.died}</td>

      <td>
        {mother ? (
          <Link
            to={`/people/${mother.slug}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>
            {person.fatherName}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
