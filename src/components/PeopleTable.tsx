import {Person} from "../types";
import React from "react";
import {useParams} from "react-router-dom";
import cn from "classnames";
import {PersonLink} from "./PersonLink";

type Props = {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({people}) => {
  const { id } = useParams();
  const findParent = (parentName: string) => {
    const parent = people.find(({name}) => name === parentName)

    if (parent) {
      return (
        <PersonLink person={parent}/>
      )
    }

    return parentName;
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
        {people.map((person) => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === id,
            })}
          >
            <td>
              <PersonLink person={person}/>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {
                person.motherName ? findParent(person.motherName) : '-'
              }
            </td>

            <td>
              {
                person.fatherName ? findParent(person.fatherName) : '-'
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
