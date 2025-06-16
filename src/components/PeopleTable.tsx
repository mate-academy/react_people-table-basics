import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  return (
    <>
      {people.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
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
              const mother = people.find(
                personObj => personObj.name === person.motherName,
              )?.slug;
              const father = people.find(
                personObj => personObj.name === person.fatherName,
              )?.slug;

              return (
                <PersonLink
                  key={person.slug}
                  person={person}
                  mother={mother}
                  father={father}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
