/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  people: Person[];
  selected: string;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people, selected }) => {
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
                className={cn({
                  'has-background-warning': selected === person.slug,
                })}
              >
                <td>
                  <PersonLink
                    to={`/people/${person.slug}`}
                    name={person.name}
                    sex={person.sex}
                  />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.mother?.slug ? (
                    <PersonLink
                      to={`/people/${person.mother?.slug}`}
                      name={person.mother.name}
                      sex={person.mother.sex}
                      isMother
                    />
                  ) : (
                    <p>{person.motherName ? person.motherName : '-'}</p>
                  )}
                </td>
                <td>
                  {person.father?.slug ? (
                    <PersonLink
                      to={`/people/${person.father?.slug}`}
                      name={person.father.name}
                      sex={person.father.sex}
                    />
                  ) : (
                    <p>{person.fatherName ? person.fatherName : '-'}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
