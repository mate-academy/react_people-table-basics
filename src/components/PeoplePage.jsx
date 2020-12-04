import React from 'react';
import PropTypes from 'prop-types';

export function PeoplePage({ people }) {
  return (
    <>
      <h2 className="subtitle">Peope page</h2>
      <ul>
        {people.map(person => (
          <div className="block">
            <table className="PeopleTable">
              <thead>...</thead>
              <tbody>...</tbody>
            </table>
            <li key={person.id}>
              <h3>{`Name: ${person.name}`}</h3>
              <p>{`${person.died - person.born} years old`}</p>

              <p>{`Person sex: ${person.sex}`}</p>
              <p>{`Born: ${person.born}`}</p>
              <p>{`Died: ${person.died}`}</p>
              <p>{`Mother: ${person.motherName}`}</p>
              <p>{`Father: ${person.fatherName}`}</p>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}

PeoplePage.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
