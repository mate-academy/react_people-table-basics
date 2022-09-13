import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const handleMotherFind = (motherName: string | undefined) => {
    const mother = people.find(person => person.name === motherName)?.slug;

    return mother;
  };

  const handleFatherFind = (fatherName: string | undefined) => {
    const father = people.find(person => person.name === fatherName)?.slug;

    return father;
  };

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
            onMotherFind={handleMotherFind}
            onFatherFind={handleFatherFind}
          />
        ))}
      </tbody>
    </table>
  );
};
