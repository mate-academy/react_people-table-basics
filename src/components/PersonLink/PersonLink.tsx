import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

interface Props {
  person: Person;
  haveParent: (name: string | null) => Person | undefined;
}

export const PersonLink: React.FC<Props> = ({
  person,
  haveParent: haveParent,
}) => {
  const { personSlug } = useParams();
  const { name, sex, born, died, fatherName, motherName, slug } = person;

  const mother = haveParent(motherName);
  const father = haveParent(fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === personSlug,
      })}
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
        {!mother ? (
          motherName || '-'
        ) : (
          <Link className="has-text-danger" to={`/people/${mother.slug}`}>
            {motherName}
          </Link>
        )}
      </td>
      <td>
        {!father ? (
          fatherName || '-'
        ) : (
          <Link to={`/people/${father.slug}`}>{fatherName}</Link>
        )}
      </td>
    </tr>
  );
};
