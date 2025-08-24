import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface RowProps {
  person: Person;
  isSelected: boolean;
  mother?: Person | undefined;
  father?: Person | undefined;
}

export const PeopleTableRow: React.FC<RowProps> = ({
  person,
  isSelected,
  mother,
  father,
}) => {
  const rowClass = isSelected ? 'has-background-warning' : undefined;

  return (
    <tr data-cy="person" className={rowClass}>
      <td>
        <PersonLink person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          mother ? (
            <PersonLink person={mother} />
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          father ? (
            <PersonLink person={father} />
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
