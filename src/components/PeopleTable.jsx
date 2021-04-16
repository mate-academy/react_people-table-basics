import React from 'react';
import PropTypes from 'prop-types';
import './PeopleTable.css';

export const PeopleTable = ({ people, headerTableData }) => (
  <table className="PeopleTable">
    <thead>
      <tr>
        {headerTableData.map(header => (
          <td key={header}>
            {header.toUpperCase()}
          </td>
        ))}
      </tr>
    </thead>
    <tbody>
      {people.map(person => (
        <tr className="Person" key={person.name}>
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.mother.name}</td>
          <td>{person.father.name}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf().isRequired,
  headerTableData: PropTypes.arrayOf().isRequired,
};
