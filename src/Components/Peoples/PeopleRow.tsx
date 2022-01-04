import React from 'react';
import { People } from '../../types/People';

type Props = {
  people: People,
};

const unknowName = () => (
  <span className="error-message">-unknown-</span>
);

export const PeopleRow: React.FC<Props> = ({ people }) => (
  <tr>
    <th>{people.name}</th>
    <th>
      {people.sex === 'm'
        ? <i className="fas fa-male" />
        : <i className="fas fa-female" /> }
    </th>
    <th>{people.born}</th>
    <th>{people.died}</th>
    <th>{people.fatherName || unknowName()}</th>
    <th>{people.motherName || unknowName()}</th>
  </tr>
);
