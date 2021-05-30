import React from 'react';
import PropTypes from 'prop-types';
import 'bulma';

import { PersonRow } from './PersonRow';

const COLUMN_NAMES = [
  'Name', 'Sex', 'Born', 'Died', 'Mother', 'Father',
];

export const PeopleTable = ({ people }) => (
  <table className="PeopleTable table">
    <thead>
      <tr>
        {COLUMN_NAMES.map(column => (
          <th key={column}>{column}</th>
        ))}
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
  people: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
    }),
  ),
};

PeopleTable.defaultProps = {
  people: [],
};
