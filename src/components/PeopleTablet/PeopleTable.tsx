import React from 'react';
import { Person } from '../../types';
import { NoPeopleOnServer } from '../NoPeopleOnServer';
import { PersonLink } from './PersonLink';

interface Props {
  peoples: Person[];
}
export enum Sex {
  MALE = 'm',
  FEMALE = 'f',
}

export const PeopleTable: React.FC<Props> = (props) => {
  const { peoples } = props;

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

      {peoples.length === 0 ? (
        <NoPeopleOnServer />
      ) : (
        <tbody>
          {
            peoples.map(person => (
              <PersonLink key={person.slug} person={person} />
            ))
          }
        </tbody>
      )}
    </table>
  );
};
