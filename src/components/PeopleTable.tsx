import React from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <div className="container">
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
              data-cy="person"
              key={person.slug}
              className={
                slug === person.slug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink name={person.name} people={people} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink name={person.motherName} people={people} />
              </td>
              <td>
                <PersonLink name={person.fatherName} people={people} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
