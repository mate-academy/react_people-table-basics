import classNames from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type PropsInfo = {
  person: Person,
  selectedPersonSlug: string;
};

export const PersonInfo: React.FC<PropsInfo> = ({
  person, selectedPersonSlug,
}) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const isSelected = selectedPersonSlug === slug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        <PersonLink
          to={slug}
          sex={sex}
          name={name}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <PersonLink
              to={mother.slug}
              sex={mother.sex}
              name={mother.name}
            />
          )
          : motherName || '-'}

      </td>
      <td>
        {father
          ? (
            <PersonLink
              to={father.slug}
              sex={father.sex}
              name={father.name}
            />
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
