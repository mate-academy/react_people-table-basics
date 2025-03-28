import React from 'react';
import PersonLink from './PersonLink';

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}

const PeopleTable: React.FC<PeopleTableProps> = ({ people, selectedSlug }) => (
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
        <tr
          key={person.slug}
          data-cy="person"
          className={
            person.slug === selectedSlug ? 'has-background-warning' : ''
          }
        >
          <td>
            <PersonLink name={person.name} people={people} />
          </td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            <PersonLink name={person.motherName || '-'} people={people} />
          </td>
          <td>
            <PersonLink name={person.fatherName || '-'} people={people} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PeopleTable;
