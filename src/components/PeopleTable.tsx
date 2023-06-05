import { useParams } from "react-router-dom";
import { Person } from "../types";
import { PersonLink } from "./PersonLink";
import classNames from "classnames";


interface PeopleTableProps {
  people: Person[],
}

export const PeopleTable: React.FC<PeopleTableProps> = ({people}) => {
  const { searchedSlug } = useParams();

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
      {people.map((person) => {
        const { sex, born, died, motherName, fatherName, slug} = person;

        const mother = people.find(searchingPerson => searchingPerson.name === motherName);

        const father = people.find(searchingPerson => searchingPerson.name === fatherName);

        return (
          <tr key={person.slug} className={classNames({'has-background-warning': searchedSlug === slug})}>
            <td>
              <PersonLink person={person} />
            </td>
            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>{motherName ? (mother ? <PersonLink person={mother} /> : motherName) : '-'}</td>
            <td>{fatherName ? (father ? <PersonLink person={father} /> : fatherName) : '-'}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
  );
}


