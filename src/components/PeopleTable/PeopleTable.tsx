import React from 'react';
// import { Loader } from "../Loader"
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
  selectedPerson: string,
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  return (
    <div className="block">
      <div className="box table-container">
        {/* <Loader />

        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>

        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p> */}

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
            {people.map((person) => (
              <PersonLink
                key={person.name}
                person={person}
                selectedPerson={selectedPerson}
                people={people}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
