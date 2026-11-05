import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedPerson: Person | undefined;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  return (
    <>
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
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning':
                    person.slug === selectedPerson?.slug,
                })}
              >
                <td>
                  <PersonLink person={person} name={person.name} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
{!person.motherName ? (
  '-'
) : (
  <PersonLink person={mother} name={person.motherName} />
)}
                </td>

                <td>
{!person.fatherName ? (
  '-'
) : (
  <PersonLink person={father} name={person.fatherName} />
)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
