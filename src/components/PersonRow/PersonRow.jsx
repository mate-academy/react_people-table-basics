import React from 'react';
import PropTypes from 'prop-types';
import './PersonRow.scss';

export const PersonRow = ({ ...person }) => (
  <tr key={person.slug} className="Person">
    <>
      <td className="person">{person.name}</td>
      <td className="person">{person.sex}</td>
      <td className="person">{person.born}</td>
      <td className="person">{person.died}</td>
      <td className="person">{person.motherName || 'no data'}</td>
      <td className="person">{person.fatherName || 'no data'}</td>
    </>
  </tr>
);

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    sex: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
    slug: PropTypes.string,
  }).isRequired,
};
