import React from 'react';
import PropTypes from 'prop-types';

import { PersonRow } from '../PersonRow';
import './PeopleTable.scss';

const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable = ({ people }) => (
  <>
    <h2>People Table!</h2>
    <table>
      <thead>
        <tr>
          {columnNames.map(name => <th key={name}>{name}</th>)}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr className="Person" key={person.slug}>
            <PersonRow {...person} />
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          {columnNames.map(name => <th key={name}>{name}</th>)}
        </tr>
      </tfoot>
    </table>
  </>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
