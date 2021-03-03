import React from 'react';
import PropTypes from 'prop-types';
import { ObjectType } from '../../types';

import './PeopleTable.scss';

import { PersonRow } from '../PersonRow';

export const PeopleTable = ({ people }) => (
  <div className="container">
    <table className="table is-bordered is-striped is-narrow">
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Sex</th>
          <th>born</th>
          <th>died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person, index) => (
          <PersonRow person={person} index={index + 1} key={person.name} />
        ))}
      </tbody>
    </table>
  </div>
);

PeopleTable.defaultProps = {
  people: [],
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    ObjectType,
  ),
};
