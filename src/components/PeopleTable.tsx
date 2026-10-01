import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from '../pages/PersonLink';
import React from 'react';

type Props = {
  people: Person[];
  selectedPerson: Person | undefined;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const findPerson = (name: string) => {
    return people.find(person => person.name === name) || null;
  };

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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': selectedPerson?.slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.motherName ? (
                findPerson(person.motherName) ? (
                  <PersonLink person={findPerson(person.motherName)} />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>

            <td>
              {person.fatherName ? (
                findPerson(person.fatherName) ? (
                  <PersonLink person={findPerson(person.fatherName)} />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
