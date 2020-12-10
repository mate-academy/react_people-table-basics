import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from './PersonRow';

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
            <th>Father</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <PersonRow
              key={index}
              name={person.name}
              sex={person.sex}
              born={person.born}
              died={person.died}
              mother={person.motherName}
              father={person.fatherName}
            />
          ))}
        </tbody>
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
