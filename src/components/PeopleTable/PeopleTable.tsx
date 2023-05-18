import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';

interface Props {
  people: Person[];
  selectedPersonSlug: string;
}

export const PeopleTable:React.FC<Props> = ({ people, selectedPersonSlug }) => {
  return (
    <table
      data-cy="peopleTable"
      // eslint-disable-next-line max-len
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
          const { slug } = person;
          const isSelected = selectedPersonSlug === slug;

          const mother = people
            .find(parent => parent.name === person.motherName);

          const father = people
            .find(parent => parent.name === person.fatherName);

          const personWithParentsLinks = { ...person, mother, father };

          return (
            <PersonInfo
              key={slug}
              person={personWithParentsLinks}
              isSelected={isSelected}
            />
          );
        })}
      </tbody>
    </table>
  );
};
