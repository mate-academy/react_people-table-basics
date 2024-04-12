import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from './types';

type Props = {
  person: Person;
  selectedPersonSlug: string | null;
};

export const PersonField: React.FC<Props> = ({
  person,
  selectedPersonSlug,
}) => {
  const { slug, sex, born, died, mother, motherName, father, fatherName } =
    person;

  return (
    <tr
      key={slug}
      data-cy="person"
      className={cn({
        'has-background-warning': selectedPersonSlug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>

      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
