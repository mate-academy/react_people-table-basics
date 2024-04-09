/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { PersonType } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

type Props = {
  person: PersonType;
};

export const Person: React.FC<Props> = ({ person }) => {
  const { born, died, sex, motherName, fatherName, mother, father, slug } =
    person;

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>

      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
