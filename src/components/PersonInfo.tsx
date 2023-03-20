import classNames from "classnames";
import React from "react";
import { Person } from "../types";
import { PersonLink } from "./PersonLink";

type Props = {
    person: Person,
    slug: string,
}

export const PersonInfo: React.FC<Props> = ({ person, slug }) => {
    const {
        name,
        sex,
        born,
        died,
        fatherName,
        motherName,
        mother,
        father,
        slug:personSlug,
    } = person;

  const mom = motherName || '-'
  const dad = fatherName || '-'

    return (
        <tr data-cy="person" className={classNames({
                  'has-background-warning': personSlug === slug,
                })}>
        <td>
          <PersonLink name={name} slug={slug} sex={sex} />
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>{mother ? <PersonLink name={mother.name} sex={mother.sex} slug={mother.slug} /> : mom}</td>
        <td>{father ? <PersonLink name={father.name} sex={father.sex} slug={father.slug} /> : dad}</td>
    </tr>
    )
}
