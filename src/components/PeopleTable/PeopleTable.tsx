import { memo, FC } from 'react';
import { Person } from '../../types/Person';
import { PeopleTableHeader } from './PeopleTableHeader';
import { PersoneRow } from './PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable: FC<Props> = memo(({ people = [] }) => {
  const header = Object.keys(people[0] || {});

  return (
    <table className="table is-striped">
      <PeopleTableHeader header={header} />
      <tbody>
        {people.map((person) => (
          <PersoneRow header={header} person={person} />
        ))}
      </tbody>
    </table>
  );
});
