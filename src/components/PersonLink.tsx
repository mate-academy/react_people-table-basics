import { Link } from 'react-router-dom';
import cn from 'classnames';
import { memo } from 'react';
import { Person } from '../types';

interface Props {
  person: Person;
  selectedPerson: string;
}

export const PersonLink: React.FC<Props> = memo((
  { person, selectedPerson },
) => {
  const {
    name,
    slug,
    sex,
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
      className={cn({ 'has-background-warning': slug === selectedPerson })}
    >
      <td>
        <Link
          to={slug}
          className={cn({ 'has-text-danger': sex === 'f' })}
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
            to={mother.slug}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <Link to={father.slug}>
            {fatherName}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
});
