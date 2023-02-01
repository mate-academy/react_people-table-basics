import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import className from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person,
};

export const PeopleTableBody: React.FC<Props> = memo(({ person }) => {
  const { slug } = useParams();

  return (
    <tbody>
      <tr
        data-cy="person"
        className={className({
          'has-background-warning': person.slug === slug,
        })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>
          {person.mother
            ? <PersonLink person={person.mother} />
            : person.motherName || '-'}
        </td>
        <td>
          {person.father
            ? <PersonLink person={person.father} />
            : person.fatherName || '-'}
        </td>
      </tr>
    </tbody>
  );
});
