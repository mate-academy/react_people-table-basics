import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { PersonRow } from '../PersonRow';
import { PersonType } from '../../types';

import 'bulma';
import './PeopleTable.scss';

export const PeopleTable = ({ people }) => (
  <table className="PeopleTable">
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
        <PersonRow
          key={nanoid()}
          person={person}
        />
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PersonType.isRequired).isRequired,
};
