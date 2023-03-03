import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person,
  selectedSlug:string
};

export const PersonInfo: React.FC<Props> = ({
  person,
  selectedSlug,
}) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
    mother,
    father,
  } = person;

  const isSelectedPerson = person.slug === selectedSlug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelectedPerson })}
    >
      <PersonLink
        name={name}
        slug={slug}
        sex={sex}
      />

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {mother
        ? (
          <PersonLink
            name={mother.name}
            slug={mother.slug}
            sex={mother.sex}
          />
        )
        : <td>{motherName || '-'}</td>}
      {father
        ? (
          <PersonLink
            name={father.name}
            slug={father.slug}
            sex={father.sex}
          />
        )
        : <td>{fatherName || '-'}</td>}
    </tr>
  );
};
