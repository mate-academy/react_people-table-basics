import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  slug: string;
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
  const isSelected = (person: Person) => person.slug === slug;

  const getPersonLinkByName = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return parentName || '-';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': isSelected(person),
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getPersonLinkByName(person.motherName)}</td>
            <td>{getPersonLinkByName(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
