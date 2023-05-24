import cn from "classnames"
import { FC } from "react";
import { useParams } from "react-router-dom";
import { Person } from "../../types/Person";
import { PersonLink } from "../PersonLink/PersonLink";

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({people}) => {
  const { personSlug } = useParams();
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
      {people.map((person) => (
        <tr
        key={person.slug}
        data-cy="person"
        className={cn({
          'has-background-warning': personSlug === person.slug,
        })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>

        <td>
          {person.mother && (<PersonLink person={person.mother} />)}
          {person.motherName && !person.mother && (
            <p>{person.motherName}</p>
          )}
          {!person.motherName && !person.mother && ('-')}
        </td>

        <td>
          {person.father && (<PersonLink person={person.father} />)}
          {person.fatherName && !person.father && (
            <p>{person.fatherName}</p>
          )}
          {!person.fatherName && !person.father && ('-')}
        </td>
      </tr>
      ))}
    </tbody>
  </table>
  )
}
