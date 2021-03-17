import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

export const PersonRow = ({ person }) => (
  <Table.Row>
    <Table.Cell>{person.name}</Table.Cell>
    <Table.Cell>{person.sex}</Table.Cell>
    <Table.Cell>{person.born}</Table.Cell>
    <Table.Cell>{person.died}</Table.Cell>
    <Table.Cell>{person.motherName}</Table.Cell>
    <Table.Cell>{person.fatherName}</Table.Cell>
  </Table.Row>
);

PersonRow.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    motherName: PropTypes.string,
    fatherName: PropTypes.string,
  }),
};

PersonRow.defaultProps = {
  person: null,
};
