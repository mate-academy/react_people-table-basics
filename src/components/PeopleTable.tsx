import { Person } from '../types';
import { PersonInfo } from '../PersonInfo';
import { PersonParants } from '../types/PersonParants';

export const findParants = (people: Person[], person: Person) => {
  const personParants: PersonParants = {
    father: null,
    mother: null,
  };

  personParants.father = people
    .find(findPerson => person.fatherName === findPerson.name) || null;
  personParants.mother = people
    .find(findPerson => person.motherName === findPerson.name) || null;

  return personParants;
};

interface Props {
  people: Person[];
  isPeopleLoading: boolean;
}

export const PeopleTable: React.FC<Props> = ({ people, isPeopleLoading }) => (
  <>
    {(!isPeopleLoading && people.length) && (
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
          {people.map((person: Person) => {
            return (
              <PersonInfo
                person={person}
                personParants={findParants(people, person)}
                key={person.slug}
              />
            );
          })}
        </tbody>
      </table>
    )}
  </>
);
