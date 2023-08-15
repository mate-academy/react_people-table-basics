import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person,
};

export const PersonTableRow: React.FC<Props> = ({ person: {
  name,
  slug,
  sex,
  born,
  died,
  mother,
  father,
  motherName,
  fatherName,
} }) => {
  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <PersonLink person={{
            slug,
            name,
            sex,
            born,
            died,
            mother,
            father,
            motherName,
            fatherName,
          }} />
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
