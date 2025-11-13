import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  active?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, active }) => {
  const activePerson = people.find(person => person.slug === active);

  return (
    <>
      <div className="box table-container">
        {/* <Loader />

        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>

        <p data-cy="noPeopleMessage">There are no people on the server</p> */}

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
            {people.map((person: Person) => (
              <PersonLink
                person={person}
                key={person.slug}
                activePerson={activePerson}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
