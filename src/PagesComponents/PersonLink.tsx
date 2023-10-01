import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { NOT_SET_VALUE, FAMEL_GENDER } from '../utils/Constans';

type Props = {
  person: Person;
  selectedPersonSlug: string | undefined;
};

export const PersonLink: React.FC<Props> = ({ person, selectedPersonSlug }) => {
  const {
    slug,
    sex,
    name,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;
  const isSelectedPerson = selectedPersonSlug === slug;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': isSelectedPerson },
      )}
    >
      <td>
        <a
          className={classNames(
            { 'has-text-danger': sex === FAMEL_GENDER },
          )}
          href={`/#people/${slug}`}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <a
            className="has-text-danger"
            href={`/#people/${mother.slug}`}
          >
            {motherName}
          </a>
        ) : (
          motherName || NOT_SET_VALUE
        )}
      </td>

      <td>
        {father ? (
          <a
            href={`/#people/${father.slug}`}
          >
            {fatherName}
          </a>
        ) : (
          fatherName || NOT_SET_VALUE
        )}
      </td>
    </tr>
  );
};
