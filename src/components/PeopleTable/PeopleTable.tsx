/* eslint-disable no-console */
import { FC, memo } from 'react';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = memo(({ people }) => {
  const columnsHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table className="table is-striped">
      <thead className="people-table__head">
        {columnsHeaders.map(header => (
          <th>{header}</th>
        ))}
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
          />
        ))}

      </tbody>
    </table>
  );
});
