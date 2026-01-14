import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();

  if (!people || people.length === 0) {
    return null;
  }
  
  const peopleWithParents: Person[] = people.map(p => ({ ...p }));

  const byName = new Map<string, Person>();
  for (const p of peopleWithParents) {
    byName.set(p.name, p);
  }

  for (const person of peopleWithParents) {
    person.mother = person.motherName
      ? byName.get(person.motherName)
      : undefined;

    person.father = person.fatherName
      ? byName.get(person.fatherName)
      : undefined;
  }

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
        {peopleWithParents.map(person => (
          <PersonLink
            key={person.name}
            person={person}
            isSelected={person.slug === slug}
          />
        ))}
      </tbody>
    </table>
  );
};
