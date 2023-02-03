import cn from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person
  selectedPersonId: string
}

export const TableRow: React.FC<Props> = ({ person, selectedPersonId }) => {
  const {
    slug,
    sex,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={cn(
        { 'has-background-warning': person.slug === selectedPersonId },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {
          mother
            ? <PersonLink person={mother} />
            : motherName || '-'
        }
      </td>
      <td>
        {
          father
            ? <PersonLink person={father} />
            : fatherName || '-'
        }
      </td>
    </tr>
  );
};
