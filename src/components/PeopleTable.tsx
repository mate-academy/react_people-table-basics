import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useLocation } from 'react-router-dom';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const allNames = new Set(people?.map(p => p.name));
  const location = useLocation();
  const selectedSlug = location.pathname.split('/')[2];

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
        {people?.map(person => {
          const isSelected = selectedSlug === person.slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={`${isSelected ? 'has-background-warning' : ''}`}
            >
              <td>
                <PersonLink name={person.name} people={people}></PersonLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  allNames.has(person.motherName) ? (
                    <PersonLink name={person.motherName} people={people} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  allNames.has(person.fatherName) ? (
                    <PersonLink name={person.fatherName} people={people} />
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
