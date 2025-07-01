import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  motherInAPI: string | false | undefined;
  fatherInAPI: string | false | undefined;
  isSelected: boolean;
};

// Link tylko dla osób w api dla non-API <td>{perosn.parentName}</td>

export const PersonLink = ({
  person,
  motherInAPI,
  fatherInAPI,
  isSelected,
}: Props) => {
  // console.log(person);

  return (
    <tr data-cy="person" className={isSelected ? 'has-background-warning' : ''}>
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={`${person.sex === 'f' && 'has-text-danger'}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherInAPI ? (
          <Link
            to={`/people/${motherInAPI}`}
            className={`${'has-text-danger'}`}
          >
            {person.motherName ? person.motherName : '-'}
          </Link>
        ) : (
          `${person.motherName ? person.motherName : '-'}`
        )}
      </td>
      <td>
        {fatherInAPI ? (
          <Link to={`/people/${fatherInAPI}`}>
            {person.fatherName ? person.fatherName : '-'}
          </Link>
        ) : (
          `${person.fatherName ? person.fatherName : '-'}`
        )}
      </td>
    </tr>
  );
};
