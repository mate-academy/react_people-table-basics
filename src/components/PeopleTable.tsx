import { useState } from 'react';
import { Person } from '../types/Person';
import PersonLink from './PersonLink';
import getSlug from '../utils/getSlug';

type Props = {
  people: Person[];
};

const PeopleTable = ({ people }: Props) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  return (
    <table className="table is-striped is-fullwidth">
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
          const isSelected = getSlug(person) === selectedSlug;

          return (
            <tr
              key={person.name}
              className={isSelected ? 'has-background-warning' : ''}
              onClick={() => setSelectedSlug(getSlug(person))}
            >
              <PersonLink name={person.name} people={people} />
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <PersonLink name={person.motherName || ''} people={people} />
              <PersonLink name={person.fatherName || ''} people={people} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
