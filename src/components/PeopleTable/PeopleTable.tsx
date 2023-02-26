import React from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

type Props = {
  people: Person[],
  slug: string,
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
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
          const personMother = people
            .find(mother => mother.name === person.motherName);
          const personFather = people
            .find(father => father.name === person.fatherName);

          return (
            <PersonInfo
              person={person}
              slug={slug}
              personMother={personMother}
              personFather={personFather}
            />
          );
        })}
      </tbody>
    </table>
  );
};
