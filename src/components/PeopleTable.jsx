import React from 'react';
import '../App.scss';

import PropTypes from 'prop-types';

import { PersonRow } from './PersonRow';

export const PeopleTable = ({ people }) => {
  const preparedPeople = people
    .map(person => ({
      ...person,
      mother: people.find(parent => parent.name === person.motherName),
      father: people.find(parent => parent.name === person.fatherName),
    }));

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
