/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import IndividualLink from './IndividualLink';

interface Props {
  person: Person;
}

const Individual : React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    slug,
    fatherName,
    motherName,
    father,
    mother,
  } = person;

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td><IndividualLink person={person} /></td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <IndividualLink person={mother} />
          : motherName || '-'}
      </td>

      <td>
        {father
          ? <IndividualLink person={father} />
          : fatherName || '-'}
      </td>
    </tr>
  );
};

export default Individual;
