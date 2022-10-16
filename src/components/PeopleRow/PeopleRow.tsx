import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import PersonLink from '../PersonLink';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ person, people }) => {
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  const { personSlug } = useParams();

  const isActive = personSlug === slug;

  const mother = people.find(personToFind => personToFind.name === motherName);
  const father = people.find(personToFind => personToFind.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isActive,
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
