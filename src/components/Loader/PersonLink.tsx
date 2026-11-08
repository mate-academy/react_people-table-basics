import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import clsx from 'clsx';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const params = useParams();

  const isCurrentParams = params.personLink === `${person.slug}`;

  return (
    <tr
      data-cy="person"
      className={clsx(isCurrentParams && 'has-background-warning')}
    >
      <td>
        <Link
          className={clsx(person.sex === 'f' && 'has-text-danger')}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.mother ? (
          <Link
            className="has-text-danger"
            to={`/people/${person.mother.slug}`}
          >
            {person.motherName ? `${person.motherName}` : '-'}
          </Link>
        ) : person.motherName ? (
          `${person.motherName}`
        ) : (
          '-'
        )}
      </td>

      <td>
        {person.father ? (
          <Link to={`/people/${person.father.slug}`}>
            {person.fatherName ? `${person.fatherName}` : '-'}
          </Link>
        ) : person.fatherName ? (
          `${person.fatherName}`
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
