import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';
import { EMPTY_VALUE } from '../../utils/variablesHelpers';

interface Props {
  person: Person
}

export const PersonComponent: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const {
    sex,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
        'has-background-warning': person.slug === slug,
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
          ? <PersonLink person={mother} />
          : motherName || EMPTY_VALUE}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || EMPTY_VALUE}
      </td>
    </tr>
  );
};
