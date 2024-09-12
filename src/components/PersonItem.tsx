import React from "react";
import { Person } from "../types";
import { ParentItem } from "./ParentItem";
import { PersonLink } from "./PersonLink";

type Props = {
  person: Person;
}

export const PersonItem: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <ParentItem parent={mother} name={motherName} />
      </td>
      <td>
        <ParentItem parent={father} name={fatherName} />
      </td>
    </tr>
  )
}
