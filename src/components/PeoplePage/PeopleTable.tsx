import PersonLink from './PersonLink';
import { Person } from '../../types';

type PeopleTableProps = {
  people: Person[];
  selectedSlug: string | null | undefined;
};

const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => {
  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {people.find(mother => mother.name === person.motherName) ? (
                <PersonLink
                  person={people.find(p => p.name === person.motherName)!}
                />
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {people.find(father => father.name === person.fatherName) ? (
                <PersonLink
                  person={people.find(p => p.name === person.fatherName)!}
                />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
