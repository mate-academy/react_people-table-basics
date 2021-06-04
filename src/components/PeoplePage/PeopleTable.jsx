import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from './PersonRow';
import './PeopleTable.scss';

export const PeopleTable = ({ people, personRows }) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        {personRows.map(personKey => (
          <th key={personKey}>{personKey}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow person={person} personRows={personRows} key={person.id} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
  personRows: PropTypes.arrayOf(PropTypes.string).isRequired,
};
