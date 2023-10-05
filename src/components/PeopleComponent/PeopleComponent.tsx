import React from 'react';

import { Person } from '../../types';
import { PERSON_PARAMETERS } from '../../utils/variablesHelpers';
import { PersonComponent } from '../PersonComponent/PersonComponent';

interface Props {
  people: Person[]
}

export const PeopleComponent: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {PERSON_PARAMETERS.map(param => (
            <th>
              {param}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <PersonComponent person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
