import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type PropsInfo = {
  person: Person,
  selectedPersonSlug: string;
};

type PropsLink = {
  to: string,
  sex: string,
  name: string,
};

const PersonLink: React.FC<PropsLink> = ({ to, sex, name }) => {
  return (
    <Link
      to={`/people/${to}`}
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
    >
      {name}
    </Link>
  );
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
