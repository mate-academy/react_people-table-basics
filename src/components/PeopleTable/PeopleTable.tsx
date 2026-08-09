import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
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
          const motherInList = people.find(
            mother => mother.name === person.motherName,
          );

          const fatherinList = people.find(
            father => father.name === person.fatherName,
          );

          return (
            <PersonLink
              key={person.slug}
              person={person}
              motherInList={motherInList}
              fatherInList={fatherinList}
            />
          );
        })}
      </tbody>
    </table>
  );
};
