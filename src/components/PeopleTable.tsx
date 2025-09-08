import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable = ({ people, selectedSlug }: Props) => (
  <table className="table is-striped is-hoverable is-narrow is-fullwidth" data-cy="peopleTable">
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
    {people.map(p => {
      return (
        <tr
          key={p.slug}
          className={p.slug === selectedSlug ? 'has-background-warning' : ''}
          data-cy="person"
        >
          <td><PersonLink person={p} /></td>
          <td>{p.sex}</td>
          <td>{p.born}</td>
          <td>{p.died}</td>
          <td>
            {p.motherName
              ? <PersonLink person={people.find(m => m.name === p.motherName) || { name: p.motherName } as Person} />
              : <span>-</span>}
          </td>
          <td>
            {p.fatherName
              ? <PersonLink person={people.find(f => f.name === p.fatherName) || { name: p.fatherName } as Person} />
              : <span>-</span>}
          </td>
        </tr>
      );
    })}
    </tbody>
  </table>
);
