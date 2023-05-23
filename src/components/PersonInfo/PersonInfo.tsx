import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

  const {
    name,
    born,
    died,
    sex,
    slug,
    fatherName,
    motherName,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === personSlug })}
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
      {
        mother
          ? (
            <td>
              <Link
                to={`/people/${mother.slug}`}
                className={cn({ 'has-text-danger': mother.sex === 'f' })}
              >
                {motherName}
              </Link>
            </td>
          ) : (
            <td>
              {motherName || '-'}
            </td>
          )
      }
      {
        father
          ? (
            <td>
              <Link to={`/people/${father.slug}`}>
                {fatherName}
              </Link>
            </td>
          ) : (
            <td>
              {fatherName || '-'}
            </td>
          )
      }
    </tr>
  );
};
