import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { PersonRow } from '../PersonRow';
import { PersonShape } from '../../types';

export const PeopleTable = ({ people }) => (
  <table className="table">
    <thead className="table-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Sex</th>
        <th scope="col">Born</th>
        <th scope="col">Died</th>
        <th scope="col">Father</th>
        <th scope="col">Mother</th>
      </tr>
    </thead>
    <tbody>
      {people.map((person, index) => (
        <tr key={person.slug} className="table-info">
          <PersonRow
            id={index + 1}
            name={person.name}
            sex={person.sex}
            born={person.born}
            died={person.died}
            father={person.father}
            mother={person.mother}
          />
        </tr>
      ))}
    </tbody>
  </table>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    shape(PersonShape).isRequired,
  ).isRequired,
};
