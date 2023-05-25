import { FC } from "react";
import cn from 'classnames';
import { Person } from "../../types/Person";
import { PersonLink } from "../PersonLink/PersonLink";

interface Props {
  person: Person;
  slug: string | undefined;
}

export const PersonItem: FC<Props> = ({ person, slug }) => {
  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
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
  )
}
