import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person,
  selectedPersonSlug: string,
  mother: Person | null,
  father: Person | null,
};

export const TablePerson: React.FC<Props> = ({
  person,
  selectedPersonSlug,
  mother,
  father,
}) => {
  const isSelected = person.slug === selectedPersonSlug;

  const personMather
  = mother
    ? <PersonLink person={mother} />
    : person.motherName || '-';

  const personFather
       = father
         ? <PersonLink person={father} />
         : person.fatherName || '-';

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{personMather}</td>
      <td>{personFather}</td>
    </tr>
  );
};
