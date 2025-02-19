import { Person } from '../../../../src/types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  onSelect: (slug: string) => void;
  selectedPerson: string | null;
};

export const People: React.FC<Props> = ({
  person,
  onSelect,
  selectedPerson,
}) => {
  const { born, died, fatherName, motherName, sex, mother, father, slug } =
    person;

  return (
    <tr
      data-cy="person"
      className={selectedPerson === slug ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink person={person} onSelect={onSelect} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} onSelect={onSelect} />
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} onSelect={onSelect} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
