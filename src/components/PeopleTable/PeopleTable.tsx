import React from 'react';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <table className="table is-striped is-hoverable is-fullwidth">
    <thead>
      <tr>
        <td>Name</td>
        <td>Sex</td>
        <td>Born</td>
        <td>Died</td>
        <td>Mother</td>
        <td>Father</td>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <tr key={person.name}>
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.motherName}</td>
          <td>{person.fatherName}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
