import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { sex, born, died, fatherName, motherName, mother, father } = person;

  return (
    <tr data-cy="person">
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother !== undefined ? (
          <PersonLink person={mother} />
        ) : (
          motherName ?? '-'
        )}
      </td>
      <td>
        {father !== undefined ? (
          <PersonLink person={father} />
        ) : (
          fatherName ?? '-'
        )}
      </td>
    </tr>
  );
};
