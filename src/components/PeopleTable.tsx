import React from 'react';
import { Person } from '../api/peopleApi';
import PersonLink from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => (
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
        const mother = people.find(p => p.name === person.motherName);
        const father = people.find(p => p.name === person.fatherName);

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink
                person={person}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </PersonLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {!person.motherName && '-'}
              {person.motherName && mother && (
                <PersonLink
                  person={mother}
                  className={mother.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.motherName}
                </PersonLink>
              )}
              {person.motherName && !mother && person.motherName}
            </td>

            <td>
              {!person.fatherName && '-'}
              {person.fatherName && father && (
                <PersonLink person={father}>{person.fatherName}</PersonLink>
              )}
              {person.fatherName && !father && person.fatherName}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default PeopleTable;
