import React from 'react';
import PropTypes from 'prop-types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = ({ people }) => (
  <div className="page">
    <h2 className="page__title">People page</h2>
    <PeopleTable people={people} />
  </div>
);

PeoplePage.propTypes = {
  people: PropTypes.arrayOf(PropTypes.object).isRequired,
};
