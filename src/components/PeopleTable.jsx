import React from 'react';
import PropTypes from 'prop-types';

import { PersonRow } from './PersonRow';

export const PeopleTable = ({ people }) => (
  <table className="card-panel purple lighten-4">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Sex</th>
        <th scope="col">Born</th>
        <th scope="col">Died</th>
        <th scope="col">Mother</th>
        <th scope="col">Father</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow person={person} key={person.name} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};
