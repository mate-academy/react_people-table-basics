import React from "react"
import { Person } from "../types"
import classNames from "classnames";
import { Link } from "react-router-dom";

type Props = {
  person: Person,
  selectPeople: string | null
};

export const PeopleInfo:React.FC<Props> = ({
  person,
  selectPeople,
}) => {
  return (
    <tr data-cy="person" className={classNames({
      'has-background-warning': selectPeople === person.slug
    })}>
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f'
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.mother ?  (
        <td>
          <Link
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        </td>
      ) : (
        <td>{person.motherName ? (person.motherName) : '-'}</td>
      )}
      {person.father ? (
        <td>
          <Link
            to={`/people/${person.father.slug}`}
          >
            {person.fatherName}
          </Link>
        </td>
      ) : (
        <td>{person.fatherName ? person.fatherName : '-'}</td>
      )
      }
    </tr>
  )
}
