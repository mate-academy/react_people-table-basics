import { memo } from 'react';
import { Person } from '../types';
import { PeopleTableRow } from './PeopleTableRow';

const columnHeadings = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

type Props = {
  people: Person[];
  selectedPersonSlug?: string;
};

export const PeopleTable: React.FC<Props> = memo(({
  people,
  selectedPersonSlug,
}) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {columnHeadings.map(heading => (
          <th key={heading}>{heading}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {people.map(person => (
        <PeopleTableRow
          key={person.slug}
          person={person}
          selectedPersonSlug={selectedPersonSlug}
        />
      ))}
    </tbody>
  </table>
));
