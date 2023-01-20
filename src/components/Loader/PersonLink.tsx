import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  selectedPerson: string;
};

export const PersonLink: FC<Props> = ({
  person: {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  },
  selectedPerson,
}) => {
  const isSelected = (value: string) => value === selectedPerson;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected(slug) })}
    >
      <td>
        <Link
          to={`../${slug}`}
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
          <Link to={`../${mother.slug}` || ''} className="has-text-danger">
            {motherName}
          </Link>
        ) : (
          <>
            {motherName || '-'}
          </>
        )}
      </td>
      <td>
        {father ? (
          <Link to={`../${father.slug}`}>
            {fatherName}
          </Link>
        ) : (
          <>
            {fatherName || '-'}
          </>
        )}
      </td>
    </tr>
  );
};
