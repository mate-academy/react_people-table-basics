import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { EMPTY_VALUE } from '../../utils/constants';

type Props = {
  person: Person;
  selectedPerson: string;
};

export const People: React.FC<Props> = ({ person, selectedPerson }) => {
  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={
        classNames({ 'has-background-warning': selectedPerson === person.slug })
      }
    >
      <PersonLink person={person} />

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {person.mother
        ? (
          <PersonLink person={person.mother} />
        ) : (
          <td>
            {person.motherName || EMPTY_VALUE}
          </td>
        )}
      {person.father
        ? (
          <PersonLink person={person.father} />
        ) : (
          <td>
            {person.fatherName || EMPTY_VALUE}
          </td>
        )}
    </tr>
  );
};
