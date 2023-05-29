import { useParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  person: Person;
}

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const { personSlug } = useParams();
  const isPersonSelected = personSlug === slug;

  return (
    <tr
      data-cy="person"
      className={classNames(
        {
          'has-background-warning': isPersonSelected,
        },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <PersonLink person={mother} />
          : motherName || '-'}
      </td>

      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || '-'}
      </td>
    </tr>
  );
};
