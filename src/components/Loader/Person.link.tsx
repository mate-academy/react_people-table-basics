import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';

export const PersonLink = ({
  person,
  people,
}: {
  person: Person;
  people: Person[];
}) => {
  const { slug } = useParams();
  const selectedSlug = slug || '';
  const motherLink = people.find(p => p.name === person.motherName);
  const fatherLink = people.find(p => p.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={person.slug === selectedSlug ? 'has-background-warning' : ''}
    >
      <td>
        {person.slug === selectedSlug ? (
          <Link to={`..`}>{person.name}</Link>
        ) : (
          <Link
            to={`../${person.slug}`}
            className={person.sex === 'f' ? 'has-text-danger' : ''}
          >
            {person.name}
          </Link>
        )}
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherLink ? (
          <Link to={`../${motherLink.slug}`} className="has-text-danger">
            {person.motherName}
          </Link>
        ) : (
          person.mother?.name || person.motherName || '-'
        )}
      </td>
      <td>
        {fatherLink ? (
          <Link to={`../${fatherLink.slug}`}>{person.fatherName}</Link>
        ) : (
          person.father?.name || person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
