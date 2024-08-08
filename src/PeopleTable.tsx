import { PersonLink } from './PersonLink';
import { Person } from './types';

interface Props {
  people: Person[];
}
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const linkParents = people.map(person => ({
    ...person,
    mother: people.find(curPerson => curPerson.name === person.motherName),
    father: people.find(curPerson => curPerson.name === person.fatherName),
  }));

  return (
    <div>
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
          {linkParents.map(person => (
            <PersonLink person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
