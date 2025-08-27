import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type PersonInfoProps = {
  person: Person;
  selected?: boolean;
  mother?: Person;
  father?: Person;
};

export const PersonInfo: React.FC<PersonInfoProps> = ({
  person,
  selected,
  mother,
  father,
}) => {
  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selected,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {!person.motherName ? (
          <span>-</span>
        ) : mother ? (
          <PersonLink person={mother} />
        ) : (
          <span>{person.motherName}</span>
        )}
      </td>
      <td>
        {!person.fatherName ? (
          <span>-</span>
        ) : father ? (
          <PersonLink person={father} />
        ) : (
          <span>{person.fatherName}</span>
        )}
      </td>
    </tr>
  );
};
