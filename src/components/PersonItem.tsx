import cn from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

const NOT_SET_PARRENT_VALUE = '-';

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
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

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

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {mother ? (
        <td>
          <PersonLink person={mother} />
        </td>
      ) : (
        <td>{motherName || NOT_SET_PARRENT_VALUE}</td>
      )}

      {father ? (
        <td>
          <PersonLink person={father} />
        </td>
      ) : (
        <td>{fatherName || NOT_SET_PARRENT_VALUE}</td>
      )}
    </tr>
  );
};
