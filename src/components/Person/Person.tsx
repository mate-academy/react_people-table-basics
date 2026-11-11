import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonComponent = ({ person, people }: Props) => {
  const location = useLocation();

  const mother = people.find(p => p.name === person.motherName);

  const father = people.find(p => p.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={
        location.pathname === `/people/${person.slug}`
          ? 'has-background-warning'
          : ''
      }
    >
      <td>
        <Link
          className={person.sex === 'f' ? 'has-text-danger' : ''}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {mother ? (
        <td>
          <Link className="has-text-danger" to={`/people/${mother.slug}`}>
            {mother.name}
          </Link>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <Link to={`/people/${father.slug}`}>{father.name}</Link>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
