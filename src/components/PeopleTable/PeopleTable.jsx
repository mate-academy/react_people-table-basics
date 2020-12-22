import React from 'react';
import { PropTypes } from 'prop-types';
import { PersonRow } from '../PersonRow/PersonRow';

export const PeopleTable = ({ people }) => (
  <table className="PeopleTable">
    <thead className="Person">
      <tr>
        {['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'].map(item => (
          <th className="Person person" key={item}>{item}</th>
        ))}
      </tr>
    </thead>
    <tbody className="Person">
      {people.map(person => (
        <tr key={person.name}>
          <PersonRow person={person} />
        </tr>
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
