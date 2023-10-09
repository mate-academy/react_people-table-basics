/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  people: Person[];
  selected: string;
}

const COLUMN_NAMES = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

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
              {COLUMN_NAMES.map(columnName => (
                <th key={columnName}>{columnName}</th>
              ))}
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
                    person.motherName || '-'
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
