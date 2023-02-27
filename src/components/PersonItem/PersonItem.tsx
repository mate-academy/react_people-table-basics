import classNames from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person,
  personSlug: string,
  mother: Person | undefined,
  father: Person | undefined,
};

export const PersonItem: React.FC<Props> = ({
  person,
  personSlug,
  mother,
  father,
}) => {
  const {
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const isSelected = personSlug === slug;
  const personMotherName = motherName || '-';
  const personFatherName = fatherName || '-';

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {!mother ? personMotherName : <PersonLink person={mother} />}
      </td>

      <td>
        {!father ? personFatherName : <PersonLink person={father} />}
      </td>
    </tr>
  );
};
