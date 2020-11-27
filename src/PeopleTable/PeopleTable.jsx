import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from '../PersonRow/PersonRow';
import { PersonShape } from '../shapes/PersonShape';
import './PeopleTable.scss';

export const PeopleTable = ({ people }) => (
  <table className="PeopleTable">
    <thead className="PeopleTable__thead">
      <tr className="">
        <td>Name</td>
        <td>Sex</td>
        <td>Born</td>
        <td>Died</td>
        <td>Mother</td>
        <td>Father</td>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow key={person.slug} person={person} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape(PersonShape)).isRequired,
};
