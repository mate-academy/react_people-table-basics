import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  person: Person
  selectedPersonId: string
}

export const TableRow: React.FC<Props> = ({ person, selectedPersonId }) => {
  const {
    slug,
    sex,
    name,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={cn(
        { 'has-background-warning': person.slug === selectedPersonId },
      )}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={cn(
            { 'has-text-danger': sex === 'f' },
            { 'has-text-info': sex === 'm' },
          )}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {
          mother ? (
            <Link
              to={`/people/${mother.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          ) : (
            motherName || '-'
          )
        }
      </td>
      <td>
        {
          father ? (
            <Link
              to={`/people/${father.slug}`}
              className="has-text-info"
            >
              {fatherName}
            </Link>
          ) : (
            fatherName || '-'
          )
        }
      </td>
    </tr>
  );
};
