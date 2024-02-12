import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  selectedPersonId: string,
};

export const PeopleItem: React.FC<Props> = ({ person, selectedPersonId }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    father,
    mother,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedPersonId,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother ? (
        <td>
          <Link
            to={`/people/${mother.slug}`}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName || ('-')}</td>
      )}

      {father ? (
        <td>
          <Link to={`/people/${father.slug}`}>{fatherName}</Link>
        </td>
      ) : (
        <td>{fatherName || ('-')}</td>
      )}
    </tr>
  );
};
