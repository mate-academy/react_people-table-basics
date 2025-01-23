import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

interface PersonLinkProps {
  person: Person;
  currentPerson: string | undefined;
  mother: Person | undefined;
  father: Person | undefined;
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  currentPerson,
  mother,
  father,
}) => {
  return (
    <tr
      data-cy="person"
      key={person.name}
      className={classNames({
        'has-background-warning': currentPerson === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
          replace={true}
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
            to={`/people/${mother?.slug}`}
            className={classNames({ 'has-text-danger': mother.sex === 'f' })}
          >
            {person.motherName}
          </Link>
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father?.slug}`}>{person.fatherName}</Link>
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
