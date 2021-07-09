import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from './PersonRow';

import './PeopleTable.scss';

const heads = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable = ({ people }) => (
  <div className="container">
    <table>
      <thead>
        <tr>{heads.map(head => <th key={`${head}_head`}>{head}</th>)}</tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr key={person.name}>
            <PersonRow {...person} />
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>{heads.map(head => <th key={`${head}_foot`}>{head}</th>)}</tr>
      </tfoot>
    </table>
  </div>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};
