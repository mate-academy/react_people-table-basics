import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from '../PersonRow';

export const PersonTable = ({ people }) => (
  <table className="table">
    <thead>
      <tr>
        <th className="col">#</th>
        <th className="col">Name</th>
        <th className="col">Sex</th>
        <th className="col">Born</th>
        <th className="col">Died</th>
        <th className="col">Mother</th>
        <th className="col">Father</th>
      </tr>
    </thead>
    <tbody>
      {people.map((person, index) => (
        <PersonRow
          key={person.slug}
          person={person}
          index={index}
        />
      ))}
    </tbody>
  </table>
);

PersonTable.propTypes = {
  people: PropTypes.arrayOf({}).isRequired,
};
