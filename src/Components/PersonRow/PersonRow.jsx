import React from 'react';
import PropTypes, { number, string } from 'prop-types';
import TableCell from '@mui/material/TableCell';

export const PersonRow = ({ people }) => (
  <>
    <TableCell>{people.name}</TableCell>
    <TableCell>{people.sex}</TableCell>
    <TableCell>{people.born}</TableCell>
    <TableCell>{people.died}</TableCell>
    <TableCell>{people.motherName}</TableCell>
    <TableCell>{people.fatherName}</TableCell>
  </>
);

PersonRow.defaultProps = {
  people: [],
};

PersonRow.propTypes = {
  people: PropTypes.shape({
    name: string,
    sex: string,
    born: number,
    died: number,
    motherName: string,
    fatherName: string,
  }),
};
