import React from 'react';
import { useParams } from 'react-router-dom';
import { PersonType } from '../types';
import PersonLink from './PersonLink';

interface Props {
  person: PersonType;
}

const Person: React.FC<Props> = ({ person }) => {
  const {
    sex, born, died, motherName, fatherName, mother, father,
  } = person;

  const { slug: activeSlug } = useParams();

  return (
    <tr
      className={person.slug === activeSlug ? 'has-background-warning' : ''}
      data-cy="person"
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || '-'
        )}
      </td>

    </tr>
  );
};

export default Person;
