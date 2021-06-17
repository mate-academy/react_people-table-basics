import React from 'react';
import PropTypes from 'prop-types';
import 'bulma';

import './PeopleTable.scss';

import { PersonRow } from '../PersonRow';

export const PeopleTable = ({ people }) => (
  <table className="PeopleTable table is-bordered is-narrow">
    <thead>
      <th className="PeopleTable__title">Name</th>
      <th className="PeopleTable__title">Sex</th>
      <th className="PeopleTable__title">Born</th>
      <th className="PeopleTable__title">Died</th>
      <th className="PeopleTable__title">Mother</th>
      <th className="PeopleTable__title">Father</th>
    </thead>
    {people.map(person => <PersonRow {...person} />)}
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf().isRequired,
};
