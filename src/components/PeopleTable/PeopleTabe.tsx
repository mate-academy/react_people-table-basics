import React, { FC } from 'react';
import { Person } from '../../types';
import { Human } from '../Human';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = React.memo(({ people }) => (
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
        const human = {
          ...person,
          father: people.find(({ name }) => (
            name === person.fatherName
          )),
          mother: people.find(({ name }) => (
            name === person.motherName
          )),
        };

        return (
          <Human key={person.name} person={human} />
        );
      })}
    </tbody>
  </table>
));
