import React from 'react';
import { Person } from '../types';
import { PeopleItem } from './PeopleItem';

type Props = {
  people: Person[],
};

export const PeopleList: React.FC<Props> = ({
  people,
}) => {
  return (
    <>
      {!people.length ? (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      ) : (
        <>
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
              {people.map(pers => (
                <PeopleItem
                  key={pers.slug}
                  human={pers}
                  people={people}
                />
              ))}
            </tbody>
          </table>
        </>
      )}

    </>
  );
};
