import { FC } from 'react';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

interface Props {
  person: Person;
  personSlug?: string;
}

export const PersonInfo: FC<Props> = ({ person, personSlug }) => {
  const { sex, born, died, slug, motherName, fatherName, mother, father } =
    person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={personSlug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{!mother ? motherName || '-' : <PersonLink person={mother} />}</td>
      <td>{!father ? fatherName || '-' : <PersonLink person={father} />}</td>
    </tr>
  );
};
