import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  const { slug } = useParams();

  return (
    <>
      <tr
        data-cy="person"
        className={classNames(
          { 'has-background-warning': slug === person.slug },
        )}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother ? <PersonLink person={mother} /> : (
            motherName || '-'
          )}
        </td>
        <td>
          {father ? <PersonLink person={father} /> : (
            fatherName || '-'
          )}
        </td>
      </tr>
    </>
  );
};
