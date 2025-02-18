import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

interface Props {
  person: Person;
  selectedPerson: string | null;
  onPersonClick: (slug: string) => void;
  people: Person[];
}

const NO_PARENT_NAME = '-';

export const PersonRow: React.FC<Props> = ({
  person,
  selectedPerson,
  onPersonClick,
  people,
}) => {
  const { slug, sex, born, died, motherName, fatherName } = person;

  const mother = people.find(p => p.name === motherName);
  const father = people.find(p => p.name === fatherName);

  return (
    <tr
      key={slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedPerson,
      })}
    >
      <td>
        <PersonLink person={person} onClick={onPersonClick} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} onClick={onPersonClick} />
        ) : (
          motherName || NO_PARENT_NAME
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} onClick={onPersonClick} />
        ) : (
          fatherName || NO_PARENT_NAME
        )}
      </td>
    </tr>
  );
};
