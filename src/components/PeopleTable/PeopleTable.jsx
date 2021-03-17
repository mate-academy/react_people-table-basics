import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { PersonRow } from '../PersonRow';

export const PeopleTable = ({ people }) => {
  const peopleWithParents = people.map(person => ({
    ...person,
    father: people.find(man => man.name === person.fatherName),
    mother: people.find(women => women.name === person.motherName),
  }));

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Sex</Table.HeaderCell>
          <Table.HeaderCell>Born</Table.HeaderCell>
          <Table.HeaderCell>Died</Table.HeaderCell>
          <Table.HeaderCell>Mother</Table.HeaderCell>
          <Table.HeaderCell>Father</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {peopleWithParents.map(person => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </Table.Body>
    </Table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  ),
};

PeopleTable.defaultProps = {
  people: [],
};
