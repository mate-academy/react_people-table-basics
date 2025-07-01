import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  slug: string | undefined;
};

function getParentSlug(people: Person[], childName: string, parentSex: string) {
  const person = people.find(p => p.name === childName);
  const parentName =
    parentSex === 'f' ? person?.motherName : person?.fatherName;

  return people.find(p => p.name === parentName)?.slug;
}

export const PeopleTable = ({ people, slug }: Props) => {
  // const person = people.find(p => p.name === people[0].name);
  // const ojcName = person?.fatherName;
  // const ojc = people.find(p => p.name === ojcName)?.slug;

  // console.log(ojc);

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
        {people.map(person => (
          <PersonLink
            person={person}
            key={person.name}
            motherInAPI={
              person.motherName
                ? getParentSlug(people, person.name, 'f')
                : false
            }
            fatherInAPI={
              person.fatherName
                ? getParentSlug(people, person.name, 'm')
                : false
            }
            isSelected={slug === person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
