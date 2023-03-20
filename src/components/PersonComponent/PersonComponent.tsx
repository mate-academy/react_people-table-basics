import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonNav } from '../PersonNav';

type Props = {
  person: Person;
  isSelected: boolean;
  mother: Person | undefined;
  father: Person | undefined;
};

export const PersonComponent: React.FC<Props> = ({
  person: {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  },
  isSelected,
  mother,
  father,
}) => (
  <tr
    data-cy="person"
    className={classNames({ 'has-background-warning': isSelected })}
  >
    <td>
      <PersonNav
        to={slug}
        name={name}
        sex={sex}
      />
    </td>

    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <td>
      {mother
        ? (
          <PersonNav
            to={mother.slug}
            name={mother.name}
            sex={mother.sex}
          />
        ) : (
          motherName || '-'
        )}
    </td>

    <td>
      {father
        ? (
          <PersonNav
            to={father.slug}
            name={father.name}
            sex={father.sex}
          />
        ) : (
          fatherName || '-'
        )}
    </td>
  </tr>
);
