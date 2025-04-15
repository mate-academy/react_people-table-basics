import { Link } from 'react-router-dom';
import { PersonLink } from './PersonLink';
export const TableItem = ({ people, mother, father, selectedSlug }) => {
  return (
    <tr
      data-cy="person"
      key={people.slug}
      className={people.slug === selectedSlug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          className={people.sex === 'f' ? 'has-text-danger' : ''}
          to={`/people/${people.slug}`}
        >
          {people.name}
        </Link>
      </td>

      <td>{people.sex}</td>
      <td>{people.born}</td>
      <td>{people.died}</td>
      <td>
        {!people.motherName ? (
          '-'
        ) : mother ? (
          <PersonLink person={mother} />
        ) : (
          people.motherName
        )}
      </td>
      <td>
        {!people.fatherName ? (
          '-'
        ) : father ? (
          <PersonLink person={father} />
        ) : (
          people.fatherName
        )}
      </td>
    </tr>
  );
};
