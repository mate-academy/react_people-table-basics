import React from 'react';
import PropTypes from 'prop-types';

import './PeopleTable.scss';
import { PersonRow } from '../PersonRow';

export const PeopleTable = ({ people }) => (
  <table className="table table-primary table-striped PeopleTable">
    <thead>
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Born</th>
        <th>Died</th>
        <th>MotherName</th>
        <th>FatherName</th>
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <PersonRow person={person} key={person.slug} />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      born: PropTypes.number.isRequired,
      died: PropTypes.number.isRequired,
      motherName: PropTypes.string,
      fatherName: PropTypes.string,
    }),
  ).isRequired,
};
