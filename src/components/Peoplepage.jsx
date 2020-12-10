import React from 'react';
import PropTypes from 'prop-types';

export const Peoplepage = ({ people }) => {
  if (!people) {
    return 'Loading...';
  }

  return (
    <div>
      <h1>People page</h1>
      <table className="PeopleTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Fathe</th>
          </tr>
        </thead>
        <tbody />
      </table>
    </div>
  );
};

Peoplepage.defaultProps = {
  people: [],
};

Peoplepage.propTypes = {
  people: PropTypes.arrayOf(Object),
};
