import React from "react"
import { Person } from "../types"
import { PersonLink } from "./PersonLink"
import classNames from "classnames"

type Props = {
  people: Person[];
  selectedSlug: string | undefined;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  if (people.length === 0) {
    return (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    );
  }

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
            {people.map(person => {
              const getParentElement = (parentName: string | null) => {
                if (!parentName) {
                  return <>{'-'}</>
                }
                const parent = people.find(per => per.name === parentName)
                return parent ? <PersonLink person={parent} /> : <>{parentName}</>
              }

              return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': person.slug === selectedSlug,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>{getParentElement(person.motherName)}</td>
                <td>{getParentElement(person.fatherName)}</td>
              </tr>
            )})}
          </tbody>
        </table>
  )
}
