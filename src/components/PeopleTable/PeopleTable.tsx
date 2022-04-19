import { FC, memo } from 'react';
import { FullPerson } from '../../types/person';
import './peopleTable.scss';
import { PersonRow } from '../PersonRow/PersonRow';

interface Props {
  people: FullPerson[]
}

export const PeopleTable: FC<Props> = memo(({ people }) => {
  return (
    <table className="people__table table is-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
});
