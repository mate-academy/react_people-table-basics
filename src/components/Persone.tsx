import React from 'react';
import { useParams } from 'react-router-dom';
import { IPerson } from '../types';
import PersoneLink from './PersoneLink';

interface Props {
  persone: IPerson;
}

const Persone: React.FC<Props> = ({ persone }) => {
  const {
    sex, born, died, motherName, fatherName, mother, father,
  } = persone;

  const { slug: activeSlug } = useParams();

  return (
    <tr
      className={persone.slug === activeSlug ? 'has-background-warning' : ''}
      data-cy="person"
    >
      <td>
        <PersoneLink person={persone} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersoneLink person={mother} />
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <PersoneLink person={father} />
        ) : (
          fatherName || '-'
        )}
      </td>

    </tr>
  );
};

export default Persone;
