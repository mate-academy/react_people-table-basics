import cn from 'classnames';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';

interface Props {
  person: Person;
}

export default function PersonLink({ person }: Props) {
  const {
    name,
    sex,
    born,
    died,
    slug,
    motherName,
    fatherName,
    mother,
    father,
  } = person;
  const { slug: personSlug } = useParams();

  const normalizedMotherName = motherName ?? '-';
  const normalizedFatherName = fatherName ?? '-';

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': personSlug === slug })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <Link className="has-text-danger" to={`/people/${mother.slug}`}>
            {motherName}
          </Link>
        ) : (
          normalizedMotherName
        )}
      </td>

      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{fatherName}</Link>
        ) : (
          normalizedFatherName
        )}
      </td>
    </tr>
  );
}
