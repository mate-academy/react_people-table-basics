import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { findPersonByName } from '../../utils/findPersonByName';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
  person: Person;
}
export const PeopleListItem: React.FC<Props> = ({ person, people }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const { selectedPersonSlug } = useParams();

  const mother = motherName && findPersonByName(people, motherName);
  const father = fatherName && findPersonByName(people, fatherName);

  return (
    <tr
      data-cy="person"
      className={
        classNames({ 'has-background-warning': slug === selectedPersonSlug })
      }
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          motherName || '-'
        )}
      </td>
    </tr>
  );
};
