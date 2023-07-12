import React from "react";
import cn from 'classnames';
import { Person } from "../../types";
import { Link, useParams } from "react-router-dom";
import { PersonLink } from "../PersonLink/PersonLink";

interface Props {
  person: Person;
}

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  
  const isSelectedPerson = person.slug === slug;

  const {
    sex,
    name,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isSelectedPerson,
      })}
    >
      <td>
        <Link
          className={cn({
            'has-text-danger': sex === 'f',
          })}
          to={`${person.slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother && (
          <PersonLink person={person.mother} />
        )}

        {!mother && `${motherName || '-'}`}
      </td>
      <td>
        {father && (
          <PersonLink person={person.father} />
        )}

        {!father && `${fatherName || '-'}`}
      </td>
    </tr>
  );
}
