import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types/Person';

interface TableRowProps {
  person: Person;
}

export const TableRow: React.FC<TableRowProps> = ({ person }) => {
  const { selectedSlug } = useParams();

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

  const isSelectedSlug = slug === selectedSlug;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isSelectedSlug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother
          ? (
            <PersonLink person={mother} />
          ) : (
            motherName || '-'
          )}
      </td>

      <td>
        {father
          ? (
            <PersonLink person={father} />
          ) : (
            fatherName || '-'
          )}
      </td>
    </tr>
  );
};
