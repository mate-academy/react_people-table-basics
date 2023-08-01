import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person | null,
  findParent: (name: string | null) => Person | null,
};

export const PersonInfo:React.FC<Props> = ({ person, findParent }) => {
  const { personId } = useParams();

  const mother = findParent(person?.motherName ? person?.motherName : null);
  const father = findParent(person?.fatherName ? person?.fatherName : null);

  const isMom = person?.motherName || '-';
  const isDad = person?.fatherName || '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personId === person?.slug,
      })}
    >
      <td key={person?.slug}>
        <PersonLink person={person} />
      </td>

      <td>{person?.sex}</td>
      <td>{person?.born}</td>
      <td>{person?.died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          isMom
        )}
      </td>

      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          isDad
        )}
      </td>
    </tr>
  );
};
