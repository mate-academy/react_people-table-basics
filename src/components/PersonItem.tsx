import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
  isSelected?: boolean,
  mother: Person | null,
  father: Person | null,
};

export const PersonItem: React.FC<Props> = ({
  person,
  isSelected = false,
  mother,
  father,
}) => {
  return (
    <tr
      data-cy="person"
      className={cn(
        { 'has-background-warning': isSelected },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {mother ? (
        <td>
          <PersonLink person={mother} />
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <PersonLink person={father} />
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
