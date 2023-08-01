import React from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonItem } from '../PersonItem/PersonItem';

type Props = {
  people: Person[]
  loading: boolean;
  isError: boolean;
};

export const PeopleTable: React.FC<Props> = ({ people, loading, isError }) => {
  return (
    <>
      <div className="container">
        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {!loading && isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!loading && !isError && !people.length && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {!loading && !isError && people.length > 0 && (
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
                    <PersonItem person={person} key={person.slug} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

    </>
  );
};
