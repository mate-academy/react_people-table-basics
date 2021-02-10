import React from 'react';
import PropTypes from 'prop-types';
import { TypePerson } from '../../types';
import { Person } from '../Person';

export const PeopleTable = ({ people }) => (
  <table className="table">
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
    <tbody>
      {people.map(person => (
        <Person key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(TypePerson.isRequired).isRequired,
};
