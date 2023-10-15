import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  person: Person;
}

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const {
    slug,
    mother,
    father,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const { personSlug } = useParams();
  const ABSENT_INFO = '-';

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? <PersonLink person={mother} /> : motherName || ABSENT_INFO}
      </td>

      <td>
        {father ? <PersonLink person={father} /> : fatherName || ABSENT_INFO}
      </td>
    </tr>
  );
};
