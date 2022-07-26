import React from 'react';
import PersonRow from './PersonRow';

type Props = {
  people: Person[];
};

const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      className="table table-striped"
      style={{ borderCollapse: 'collapse' }}
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Sex</th>
          <th scope="col">Born</th>
          <th scope="col">Died</th>
          <th scope="col">Mother</th>
          <th scope="col">Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person, i) => (
          <PersonRow
            key={person.slug}
            person={person}
            index={i + 1}
          />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
