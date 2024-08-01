import { useParams } from "react-router-dom";
import { Person } from "../../types";
import classNames from "classnames";
import { PersonConnection } from "../PersonConnection/PersonConnection";

type PeopleTableProps = {
  people: Person[] | undefined;
};

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const { slugId } = useParams<{ slugId: string }>();
  const selectedPerson = people?.find((person) => person.slug === slugId);

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
        {people?.map((person) => {
          const { slug, sex, born, died, fatherName, motherName } = person;

          const motherPerson = people.find(
            (p) => p.name === motherName,
          );
          const fatherPerson = people.find(
            (p) => p.name === fatherName,
          );

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                "has-background-warning": selectedPerson?.slug === slug,
              })}
            >
              <td>
                <PersonConnection person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {motherPerson ? (
                  <PersonConnection person={motherPerson} />
                ) : (
                  <span>{motherName || "-"}</span>
                )}
              </td>

              <td>
                {fatherPerson ? (
                  <PersonConnection person={fatherPerson} />
                ) : (
                  <span>{fatherName ? fatherName : "-"}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
