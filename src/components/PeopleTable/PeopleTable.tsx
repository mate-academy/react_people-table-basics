import React from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
}) => {
  const renderRelative = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const relative = people.find(person => person.name === name);

    return relative ? <PersonLink person={relative} /> : name;
  };

  return (
    <div className="box table-container">
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
                person.slug === selectedSlug
                  ? 'has-background-warning'
                  : undefined
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderRelative(person.motherName)}</td>
              <td>{renderRelative(person.fatherName)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
