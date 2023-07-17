import { FC } from 'react';
import { Person } from '../types';
import { PeopleTableBody } from './PeopleTableBody';
import { PeopleTableHeader } from './PeopleTableHeader';

const headersPersonTable = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

interface PeopleTableProps {
  people: Person[]
}

export const PeopleTable: FC<PeopleTableProps> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHeader titles={headersPersonTable} />

      <PeopleTableBody people={people} />
    </table>
  );
};
