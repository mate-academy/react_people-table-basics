import React from 'react';
import PropTypes from 'prop-types';
import { PeopleTable } from '../PeopleTable';

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
      id: PropTypes.string.isRequired,
      died: PropTypes.number,
      born: PropTypes.number.isRequired,
      motherName: PropTypes.string,
      fatherName: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
