import React from 'react';
import { People } from '../../types/People';

type Props = {
  people: People,
};

const unknowName = () => (
  <span style={{ color: '#bc544b' }}>
    unknown
  </span>
);

export const PeopleRow: React.FC<Props> = ({ people }) => (
  <tr>
    <th>{people.name}</th>
    <th>{people.sex}</th>
    <th>{people.born}</th>
    <th>{people.died}</th>
    <th>{people.fatherName || unknowName()}</th>
    <th>{people.motherName || unknowName()}</th>
  </tr>
);
