import React from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonalInfo } from './PersonalInfo/PersonalInfo';

type Props = {
  people: Person[] | null,
  hasError: boolean,
};

export const PeopleTable: React.FC<Props> = ({ people, hasError }) => {
  const hasPeople = people ? people.length > 0 : true;
  const hasTable = hasPeople && people;

  return (
    <div className="box table-container">
      {!people && <Loader />}
      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!hasPeople && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {hasTable && (
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
              <PersonalInfo
                key={person.slug}
                person={person}
                people={people}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
