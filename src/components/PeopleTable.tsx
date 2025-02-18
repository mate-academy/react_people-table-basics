import React from 'react';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();

  const getPersonByName = (name: string): Person | undefined => {
    return people.find(person => person.name === name);
  };

  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
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
          return (
            <tr
              key={person.name}
              className={slug === person.slug ? 'has-background-warning' : ''}
              data-cy="person"
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born ?? '-'}</td>
              <td>{person.died ?? '-'}</td>
              <td>
                {person.motherName ? (
                  getPersonByName(person.motherName) ? (
                    <PersonLink person={getPersonByName(person.motherName)!} />

                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  getPersonByName(person.fatherName) ? (
                    <PersonLink person={getPersonByName(person.fatherName)!} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
