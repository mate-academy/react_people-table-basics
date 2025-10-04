import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { useParams } from 'react-router-dom';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable = ({ people }: PeopleTableProps) => {
  // Fallback to wildcard param if slug is undefined
  const params = useParams<{ slug?: string; '*': string }>();
  const slug = params.slug ?? params['*'];

  return (
    <div className="block">
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
                className={person.slug === slug ? 'has-background-warning' : ''}
              >
                <td>
                  <PersonLink person={person} people={people} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  <PersonLink person={person.motherName} people={people} />
                </td>
                <td>
                  <PersonLink person={person.fatherName} people={people} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
