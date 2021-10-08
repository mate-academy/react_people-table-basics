import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PersonRow } from '../PersonRow';

export const PeopleTable = (props) => {
  const { peoples } = props;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell width="250px">Name</StyledTableCell>
              <StyledTableCell>Sex</StyledTableCell>
              <StyledTableCell>Born</StyledTableCell>
              <StyledTableCell>Died</StyledTableCell>
              <StyledTableCell>Mother</StyledTableCell>
              <StyledTableCell>Father</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {peoples.map(people => (
              <StyledTableRow key={people.slug}>
                <PersonRow people={people} />
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

PeopleTable.defaultProps = {
  peoples: [],
};

PeopleTable.propTypes = {
  peoples: PropTypes.arrayOf(PropTypes.object),
};
