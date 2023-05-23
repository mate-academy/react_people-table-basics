import React from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';

type Props = {
  people: Person[];
  error: string;
  isLoading: boolean;
};

export const PeopleTable: React.FC<Props> = ({ people, error, isLoading }) => {
  return (
    <div className="box table-container">
      {isLoading && <Loader />}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}

      {!people.length && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

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
          {people.map((person) => {
            return (
              <PersonItem key={person.name} person={person} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
