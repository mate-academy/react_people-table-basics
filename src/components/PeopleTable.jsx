import { PropTypes } from 'prop-types';
import React from 'react';
import { PersonRow } from './PersonRow';

export const PeopleTable = ({ people }) => {
  return (
    <>
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
            <PersonRow person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({

    }),
  ),
};

PeopleTable.defaultProps = {
  people: [],
};
