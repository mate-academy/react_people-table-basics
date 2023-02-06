import classNames from "classnames";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { Person } from "../types";
import { PersonLink } from "./PersonLink";

interface Props {
  people: Person[];
}

const headers = [
  { id: 1, title: 'Name' },
  { id: 2, title: 'Sex' },
  { id: 3, title: 'Born' },
  { id: 4, title: 'Died' },
  { id: 5, title: 'Mother' },
  { id: 6, title: 'Father' },
];

export const PeopleTable: FC<Props> = (props) => {
  const { people } = props;

  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.id}>
              {header.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.mother ? (
                  <PersonLink person={person.mother} />
                ) : (
                  person.motherName ?? '-'
                )}
              </td>

              <td>
                {person.father ? (
                  <PersonLink person={person.father} />
                ) : (
                  person.fatherName ?? '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
