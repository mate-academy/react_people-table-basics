import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';
import React from 'react';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { sex, born, died, fatherName, motherName, slug, mother, father } =
    person;
  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <PeopleLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PeopleLink person={mother} /> : motherName || '-'}</td>
      <td>{father ? <PeopleLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
