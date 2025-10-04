import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  activePeopleSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, activePeopleSlug }) => {
  const renderPerson = (name?: string | null) => {
    if (!name) {
      return '-';
    }

    const person = people.find(p => p.name === name);

    return person ? <PersonLink person={person} /> : name;
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
              'has-background-warning': person.slug === activePeopleSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderPerson(person.motherName)}</td>
            <td>{renderPerson(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
