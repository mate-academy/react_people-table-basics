import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { CustomLink } from '../CustomLink';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const { mother, father, sex, born, died } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <CustomLink to={person.slug} name={person.name} sex={sex} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <CustomLink
            to={`/people/${mother.slug}`}
            name={mother.name}
            sex={mother.sex}
          />
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <CustomLink
            to={`/people/${father.slug}`}
            name={father.name}
            sex={father.sex}
          />
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
