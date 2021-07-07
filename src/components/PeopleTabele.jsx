import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from './PersonRow';
import '../App.scss';

export function PeopleTable({ people }) {
  return (
    <table className="PeopleTable">
      <thead>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
      </thead>
      <tbody>
        {people.map(person => <PersonRow person={person} />)}
      </tbody>
    </table>
  );
}

PeopleTable.propTypes = {
  people: PropTypes.objectOf(PropTypes.string).isRequired,
};
