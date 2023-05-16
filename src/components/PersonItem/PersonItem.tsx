import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[]
  person: Person,
};

export const PersonItem: React.FC<Props> = ({
  person, people,
}) => {
  const {
    sex, born, died, motherName, fatherName, slug,
  } = person;
  const mother = people.find(item => item.name === motherName);
  const father = people.find(item => item.name === fatherName);
  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={`${personSlug === slug ? 'has-background-warning' : ''}`}
    >
      <td>
        <PersonLink
          person={person}
        />
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
