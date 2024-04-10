
import { Person } from "../../../types";
import { PersonLink } from "../PersonLink/PersonLink";
import classNames from "classnames";

type Props = {
  person: Person;
  personSlug: string | undefined;
  getFather: (name: string | null) => Person | undefined;
  getMother: (name: string | null) => Person | undefined;
}
export const PersonItem: React.FC<Props> = ({ person, personSlug, getFather, getMother }) => {
  const { sex, born, died, slug, motherName, fatherName } = person;
  const mother = getMother(motherName);
  const father = getFather(fatherName);

  return (
    <tr
      key={slug}
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === personSlug})}
    >
    <td>
        <PersonLink person={person}/>
    </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>
      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
</tr>
  )
}



