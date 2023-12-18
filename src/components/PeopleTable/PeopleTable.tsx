import React from 'react';
import cn from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface PeopleTableProps {
  peopleList: Person[];
  selectedPerson: string;
}

const SELECTED = 'has-background-warning';

export const PeopleTable: React.FC<PeopleTableProps> = ({
  peopleList,
  selectedPerson,
}) => {
  const findPerson = (personName: string) => {
    const person = peopleList.find(item => item.name === personName);

    return person
      ? <PersonLink person={person} />
      : personName;
  };

  return (
    <>
      {peopleList.length === 0 ? (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      ) : (
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
            {peopleList.map((person) => (
              <tr
                data-cy="person"
                className={cn({
                  [SELECTED]: selectedPerson === person.slug,
                })}
                key={person.name}
              >
                {/* eslint-disable jsx-a11y/control-has-associated-label */}
                <td>
                  <PersonLink
                    person={person}
                  />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    findPerson(person.motherName)
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    findPerson(person.fatherName)
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
