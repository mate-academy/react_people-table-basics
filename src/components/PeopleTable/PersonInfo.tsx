import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  selectedPersonSlug: string;
};

export const PersonInfo: React.FC<Props> = ({
  person,
  selectedPersonSlug,
}) => {
  const isSelected = selectedPersonSlug === person.slug;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isSelected })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? (
            <PersonLink person={person.mother} />
          ) : (
            person.motherName || '-'
          )}
      </td>
      <td>
        {person.father
          ? (
            <PersonLink person={person.father} />
          ) : (
            person.fatherName || '-'
          )}
      </td>
    </tr>
  );
};
