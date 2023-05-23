import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  selectedSlug: string;
  people: Person[];

};

export const PersonPage: React.FC<Props> = ({
  person,
  selectedSlug,
  people,
}) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const hasSelected = slug === selectedSlug;
  const selectedMother = people.find(p => p.name === motherName);
  const selectedFather = people.find(p => p.name === fatherName);
  const motherNameCell = motherName || '-';
  const fatherNameCell = fatherName || '-';

  return (
    <tr
      key={slug}
      data-cy="person"
      className={cn({
        'has-background-warning': hasSelected,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {selectedMother
          ? <PersonLink person={selectedMother} />
          : motherNameCell}
      </td>

      <td>
        {selectedFather
          ? <PersonLink person={selectedFather} />
          : fatherNameCell}
      </td>
    </tr>
  );
};
