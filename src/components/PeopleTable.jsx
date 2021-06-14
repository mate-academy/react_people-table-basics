import React from 'react';
import '../App.scss';

import PropTypes from 'prop-types';

import { PersonRow } from './PersonRow';

export const PeopleTable = ({ people }) => {
  const preparedPeople = people
    .filter(child => people
      .find(parent => parent.name === child.motherName
        || parent.name === child.fatherName));

  return (
    <table className="PeopleTable">
      <thead>
        <tr>
          <th>name</th>
          <th>sex</th>
          <th>born</th>
          <th>died</th>
          <th>mother</th>
          <th>father</th>
        </tr>
      </thead>

      {preparedPeople.map(person => (
        <tbody key={person.slug}>
          <PersonRow {...person} />
        </tbody>
      ))}
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
};
