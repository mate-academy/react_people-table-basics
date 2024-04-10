import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonName } from '../PersonName';
import { Sex } from '../../types/Sex';

type PersonLinkProps = {
  person: Person & {
    motherNameLink: string | null;
    fatherNameLink: string | null;
  };
};

export const PersonLink: React.FC<PersonLinkProps> = ({
  person: {
    name,
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
    motherNameLink,
    fatherNameLink,
  },
}) => {
  const { personId } = useParams();

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': personId === slug,
      })}
    >
      <td>
        <PersonName name={name} slug={slug} sex={sex} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherNameLink ? (
          <PersonName
            name={motherName || undefined}
            slug={motherNameLink}
            sex={Sex.Female}
          />
        ) : (
          <span>{motherName || '-'}</span>
        )}
      </td>
      <td>
        {fatherNameLink ? (
          <PersonName
            name={fatherName || undefined}
            slug={fatherNameLink}
            sex={Sex.Male}
          />
        ) : (
          <span>{fatherName || '-'}</span>
        )}
      </td>
    </tr>
  );
};
