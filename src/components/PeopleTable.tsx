import React from 'react';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

export interface Props {
  selectedPeople: string | undefined;
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people, selectedPeople }) => {
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
        {people.map(onePeople => {
          const mother = people.find(p => p.name === onePeople.motherName);
          const father = people.find(p => p.name === onePeople.fatherName);

          return (
            <tr
              key={onePeople.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': onePeople.slug === selectedPeople,
              })}
            >
              <td>
                <PersonLink person={onePeople} />
              </td>

              <td>{onePeople.sex}</td>
              <td>{onePeople.born}</td>
              <td>{onePeople.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  onePeople.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  onePeople.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
