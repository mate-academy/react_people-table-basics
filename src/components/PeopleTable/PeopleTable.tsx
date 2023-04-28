import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[],
  personSlug: string,
};

export const PeopleTable: React.FC<Props> = ({ people, personSlug }) => {
  return (
    <>
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
            const motherLink = people
              .find(mother => mother.name === person.motherName) || null;
            const fatherLink = people
              .find(father => father.name === person.fatherName) || null;

            return (
              <PersonLink
                motherLink={motherLink}
                fatherLink={fatherLink}
                key={person.slug}
                person={person}
                personSlug={personSlug}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
