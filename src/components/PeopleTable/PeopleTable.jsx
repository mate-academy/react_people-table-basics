import React from 'react';
import PropTypes from 'prop-types';
import 'bulma';
import { PersonRow } from '../PersonRow';

export function PeopleTable({ people }) {
  return (
    <table className="table is-striped is-fullwidth">
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
          <PersonRow
            key={person.slug}
            name={person.name}
            sex={person.sex}
            born={person.born}
            died={person.died}
            motherName={person.motherName}
            fatherName={person.fatherName}
          />
        ))}
      </tbody>
    </table>
  );
}

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      born: PropTypes.number.isRequired,
      died: PropTypes.number.isRequired,
      motherName: PropTypes.string,
      fatherName: PropTypes.string,
    }),
  ).isRequired,

};

PersonRow.defaultProps = {
  motherName: null,
  fatherName: null,
};
