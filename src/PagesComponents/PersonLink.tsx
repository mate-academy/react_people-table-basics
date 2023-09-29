import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  selectedPersonSlug: string | undefined;
};

export const PersonLink: React.FC<Props> = ({ person, selectedPersonSlug }) => {
  const isSelectedPerson = selectedPersonSlug === person.slug;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': isSelectedPerson },
        { '': !isSelectedPerson },
      )}
    >
      <td>
        <a
          className={person.sex === 'f' ? 'has-text-danger' : ''}
          href={`#/people/${person.slug}`}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.mother ? (
          <a
            className="has-text-danger"
            href={`#/people/${person.mother.slug}`}
          >
            {person.motherName}
          </a>
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {person.father ? (
          <a
            href={`#/people/${person.father.slug}`}
          >
            {person.fatherName}
          </a>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
