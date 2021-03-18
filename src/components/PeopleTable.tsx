import React, { useEffect, useState } from 'react';
import { getPeople } from '../api/people';
import { PersonRow, Person } from './PersonRow';

const styleForTable: React.CSSProperties = {
  borderCollapse: 'collapse',
};

export const PeopleTable = () => {
  const [people, setPeople] = useState<Array<Person>>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <div className="table_root">
      <table
        style={styleForTable}
        className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
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
            <PersonRow key={person.name} {...person} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
