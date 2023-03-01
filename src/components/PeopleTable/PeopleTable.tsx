import React from 'react';

import { Person } from '../../types';
import { TablePerson } from '../TablePerson';

type Props = {
  people: Person[],
  isError: boolean,
  selectedPersonSlug: string,
};

export const PeopleTable: React.FC<Props> = React.memo(
  ({
    people,
    isError,
    selectedPersonSlug,
  }) => {
    if (isError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (!people.length) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

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
          {people.map(person => {
            const personMother
            = people.find(mother => mother.name === person.motherName) || null;

            const personFather
            = people.find(father => father.name === person.fatherName) || null;

            return (
              <TablePerson
                key={person.slug}
                person={person}
                selectedPersonSlug={selectedPersonSlug}
                mother={personMother}
                father={personFather}
              />
            );
          })}
        </tbody>
      </table>
    );
  },
);
