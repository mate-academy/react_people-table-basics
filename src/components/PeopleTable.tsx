import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable = ({ people, selectedSlug }: Props) => (
  <table className="table is-striped" data-cy="peopleTable">
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
      {people.map(p => (
        <tr
          key={p.slug}
          className={p.slug === selectedSlug ? 'has-background-warning' : ''}
          data-cy="person"
        >
          <td>
            <PersonLink person={p} name={p.name} />
          </td>
          <td>{p.sex}</td>
          <td>{p.born}</td>
          <td>{p.died}</td>
          <td>
            <PersonLink
              name={p.motherName || ''}
              person={people.find(m => m.name === p.motherName)}
            />
          </td>
          <td>
            <PersonLink
              name={p.fatherName || ''}
              person={people.find(f => f.name === p.fatherName)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
