import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person
};

export const PersonData: React.FC<Props> = ({ person }) => {
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

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === personSlug })}
    >
      <td>
        <Link
          to={`${slug}`}
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
              to={`${mother.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          </td>
        )
        : <td>{motherName || '-'}</td>}
      {father
        ? <td><Link to={`${father.slug}`}>{fatherName}</Link></td>
        : <td>{fatherName || '-'}</td>}
    </tr>
  );
};
