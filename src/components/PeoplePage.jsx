import React from 'react';
import PropTypes from 'prop-types';
import { PeopleTable } from './PeopleTable';

export function PeoplePage({ people }) {
  return (
    <>
      <h2 className="subtitle">Peope page</h2>
      <PeopleTable people={people} />
    </>
  );
}

PeoplePage.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      died: PropTypes.string.isRequired,
      born: PropTypes.string.isRequired,
      motherName: PropTypes.string.isRequired,
      fatherName: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
