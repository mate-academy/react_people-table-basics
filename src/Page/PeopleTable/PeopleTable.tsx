import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { NoPeopleOnServer } from '../NoPeopleOnServer/NoPeopleOnServer';

type Props = {
  people: Person[];
  selectedPerson?: string | null;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-striped
        is-hoverable
        is-narrow is-fullwidth
      "
    >
      {people.length === 0 ? (
        <thead>
          <NoPeopleOnServer />
        </thead>
      ) : (
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
      )}

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames('', {
                'has-background-warning': person.slug === selectedPerson,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  <span>{person.motherName || '-'}</span>
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  <span>{person.fatherName || '-'}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
