import React, { memo } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

interface Props {
  person: Person
}

export const PersonItem: React.FC<Props> = memo(({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === person.slug },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {
          person.mother
            ? <PersonLink person={person.mother} />
            : person.motherName || '-'
        }
      </td>
      <td>
        {
          person.father
            ? <PersonLink person={person.father} />
            : person.fatherName || '-'
        }
      </td>
    </tr>
  );
});
