import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  isSelected: boolean;
};

export const PeopleItem = ({ person, isSelected }: Props) => {
  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <PersonLink slug={person.slug} name={person.name} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName ?? '-'}</td>
      <td>{person.fatherName ?? '-'}</td>
    </tr>
  );
};
