import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <tr data-cy="person">
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {person.mother ? (
        <td>
          <Link
            className={person.mother.sex === 'f' ? 'has-text-danger' : ''}
            to={`/people/${person.mother?.slug}?`}
          >
            {person.motherName}
          </Link>
        </td>
      ) : (
        <td>{person.motherName ? person.motherName : '-'}</td>
      )}

      {person.father ? (
        <td>
          <Link to={`/people/${person.father.slug}?`}>{person.fatherName}</Link>
        </td>
      ) : (
        <td>{person.fatherName ? person.fatherName : '-'}</td>
      )}

      {/* <td>
        <Link to={`/people/:${person.fatherName}?`}>{person.fatherName}</Link>
      </td> */}
    </tr>
  );
};
