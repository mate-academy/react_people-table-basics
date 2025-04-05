import React, { memo, useMemo } from 'react';
import { Person } from '../../types/Person';
import { Loader } from '../Loader/Loader';
import { tableColumns } from './tableColumns';

interface Props {
  people: Person[];
  selectedSlug: string | null;
  isLoading: boolean;
  error: string | null;
}

const TableRowComponent: React.FC<{
  person: Person;
  people: Person[];
  isSelected: boolean;
}> = ({ person, people, isSelected }) => (
  <tr data-cy="person" className={isSelected ? 'has-background-warning' : ''}>
    {tableColumns.map(({ key, render }) => (
      <td key={key}>{render ? render(person, people) : person[key]}</td>
    ))}
  </tr>
);

TableRowComponent.displayName = 'TableRow';

const TableRow = memo(TableRowComponent);

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  isLoading,
  error,
}) => {
  const memoizedPeople = useMemo(() => people, [people]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div className="box table-container">
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {tableColumns.map(({ title, key }) => (
              <th key={key}>{title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            <TableRow
              key={person.slug}
              person={person}
              people={memoizedPeople}
              isSelected={selectedSlug === person.slug}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

PeopleTable.displayName = 'PeopleTable';
