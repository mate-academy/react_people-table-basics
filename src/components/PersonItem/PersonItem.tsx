import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = React.memo(({ person }) => {
  const {
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;
  const { personSlug = '' } = useParams();

  const motherNameCell = motherName || '-';
  const fatherNameCell = fatherName || '-';

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {(
          mother
            ? <PersonLink person={mother} />
            : motherNameCell
        )}
      </td>
      <td>
        {(
          father
            ? <PersonLink person={father} />
            : fatherNameCell

        )}
      </td>
    </tr>
  );
});
