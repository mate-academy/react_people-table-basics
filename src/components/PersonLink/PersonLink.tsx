import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name, sex, born, died, fatherName, motherName, mother, father, slug,
  } = person;

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <Link
          to={slug}
          className={cn({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother && (
          <Link to={mother.slug} className="has-text-danger">
            {motherName}
          </Link>
        )}

        {!mother && motherName ? motherName : '-'}
      </td>

      <td>
        {father && (
          <Link to={father.slug}>
            {fatherName}
          </Link>
        )}

        {!father && fatherName ? fatherName : '-'}
      </td>
    </tr>
  );
};
