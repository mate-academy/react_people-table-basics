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

  const personsMotherLink = (person: Person) => {
    const mother = people.find(p => p.name === person.motherName);

    if (mother) {
      return (
        <PersonLink person={mother} />
      );
    }

    return person.motherName
      ? person.motherName
      : '-';
  };

  const personsFatherLink = (person: Person) => {
    const father = people.find(p => p.name === person.fatherName);

    if (father) {
      return (
        <PersonLink person={father} />
      );
    }

    return person.fatherName
      ? person.fatherName
      : '-';
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
            <td>{personsMotherLink(person)}</td>
            <td>{personsFatherLink(person)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
