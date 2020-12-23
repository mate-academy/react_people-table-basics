import React from 'react';
import { Person } from '../../api/interface';
import { Parents } from '../Parents';

import './PersonRow.scss';

type PersonRow = {
  person: Person;
};

export const PersonRow: React.FC<PersonRow> = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>
      {person.father !== undefined
        ? (
          <Parents parents={person.father} />
        )
        : null}
    </td>
    <td>
      {person.mother !== undefined
        ? (
          <Parents parents={person.mother} />
        )
        : null}
    </td>
  </tr>
);
