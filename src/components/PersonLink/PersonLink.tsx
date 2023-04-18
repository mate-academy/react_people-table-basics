import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  isSelected: boolean,
};

export const PersonLink: FC<Props> = ({ person, isSelected }) => {
  const {
    slug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            to={`/people/${mother.slug}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : motherName || '-'}
      </td>
      <td>
        {father ? (
          <Link
            to={`/people/${father.slug}`}
          >
            {father.name}
          </Link>
        ) : fatherName || '-'}
      </td>
    </tr>
  );
};
