import React from 'react';
import { Person } from '../types';
import PersonItem from './PersonItem';

type Props = {
  people: Person[];
};

const PersonList: React.FC<Props> = ({ people }) => {
  return (
    <>
      {people.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
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
    </>
  );
};

export default PersonList;
