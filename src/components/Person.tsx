import React from 'react';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { PersonType } from '../types';

type Props = {
  person: PersonType;
  personSlug: string | undefined;
};

export const Person: React.FC<Props> = ({ person, personSlug }) => {
  const { sex, born, died, motherName, fatherName, mother, father, slug } =
    person;

  return (
    <tr
      data-cy="person"
      key={slug}
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
