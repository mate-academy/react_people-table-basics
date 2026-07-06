import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonOfTable } from '../PersonOfTable';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const { slug } = useParams();

  const selected = people.find(person => person.slug === slug);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
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
        {people.map(person => {
          return (
            <PersonOfTable
              person={person}
              key={person.slug}
              selected={selected}
            />
          );
        })}
      </tbody>
    </table>
  );
};
