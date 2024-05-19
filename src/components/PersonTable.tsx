import React from 'react';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import classNames from 'classnames';

interface Props {
  people: Person[];
  selectedPerson: string | null;
}

export const PersonTable: React.FC<Props> = ({ people, selectedPerson }) => {
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
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': selectedPerson === person.slug,
            })}
          >
            <PersonLink people={people} person={person} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
