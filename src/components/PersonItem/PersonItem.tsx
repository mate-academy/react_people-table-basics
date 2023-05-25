import { FC } from "react";
import cn from 'classnames';
import { Person } from "../../types/Person";
import { PersonLink } from "../PersonLink/PersonLink";

interface Props {
  person: Person;
  personSlug: string | undefined;
}

export const PersonItem: FC<Props> = ({ person, personSlug }) => {
  const {
    slug,
    sex,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName
  } = person
  return (
    <tr
      key={slug}
      data-cy="person"
      className={cn({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother && (<PersonLink person={mother} />)}
        {motherName && !mother && (
          <p>{motherName}</p>
        )}
        {!motherName && !mother && ('-')}
      </td>

      <td>
        {father && (<PersonLink person={father} />)}
        {fatherName && !father && (
          <p>{fatherName}</p>
        )}
        {!fatherName && !father && ('-')}
      </td>
    </tr>
  )
}
