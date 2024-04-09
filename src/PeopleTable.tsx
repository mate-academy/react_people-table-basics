import { Person } from "./types";
import { PersonLink } from "./PersonLink";

type Props = {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {

  const choosenPeople = people.map(person => ({
    ...person,
    mother: people.find(
      personElement => personElement.name === person.motherName,
    ),
    father: people.find(
      personElement => personElement.name === person.fatherName,
    ),
  }));

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
        {choosenPeople.map(person => (
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
