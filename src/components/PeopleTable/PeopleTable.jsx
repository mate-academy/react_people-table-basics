import React from 'react';
import PropTypes from 'prop-types';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

export const PeopleTable = ({ people }) => (
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
          <PersonRow {...person} key={person.slug} />
        ))}
      </tbody>
    </table>
  </>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sex: PropTypes.string,
      born: PropTypes.number,
      died: PropTypes.number,
      motherName: PropTypes.string,
      fatherName: PropTypes.string,
      slug: PropTypes.string,
    }),
  ).isRequired,
};
