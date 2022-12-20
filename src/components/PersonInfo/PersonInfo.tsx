import { useParams, Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersoneLink/PersonLink';

interface Props {
  person: Person,
}

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const { personSlug = '' } = useParams();

  return (
    <tr
      data-cy="person"
      className={slug === personSlug ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink slug={slug} name={name} sex={sex} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            to={`/people/${mother.slug}`}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={`/people/${father.slug}`}
          >
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
