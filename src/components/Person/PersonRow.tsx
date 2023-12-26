import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    slug,
    fatherName,
    motherName,
    mother,
    father,
  } = person;

  const { personSlug } = useParams();

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
      {mother
        ? (
          <td>
            <Link
              to={`/people/${mother.slug}`}
              className="has-text-danger"
            >
              {mother.name}
            </Link>
          </td>
        ) : (
          <td>{motherName}</td>
        )}
      {father
        ? (
          <td>
            <Link
              to={`/people/${father.slug}`}
            >
              {father.name}
            </Link>
          </td>
        ) : (
          <td>{fatherName}</td>
        )}
    </tr>
  );
};
