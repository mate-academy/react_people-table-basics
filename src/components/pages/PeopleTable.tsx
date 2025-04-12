import React, { useState } from 'react';
import { Person } from '../../types/Person';
import PersonLink from './PersonLink';

interface Props {
  people: Person[];
}

const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  return (
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
              selectedSlug === person.slug ? 'has-background-warning' : ''
            }
            onClick={() => setSelectedSlug(person.slug)}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? <PersonLink person={person.mother} /> : '-'}
            </td>
            <td>
              {person.father ? <PersonLink person={person.father} /> : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
