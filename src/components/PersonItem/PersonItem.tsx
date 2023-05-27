import { FC } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person
};

export const PersonItem: FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    slug: personSlug,
    fatherName,
    motherName,
    mother,
    father,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <Link
          to={`../${personSlug}`}
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
          <Link to={`../${mother.slug}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : (
          <>
            {motherName || '-'}
          </>
        )}
      </td>

      <td>
        {father ? (
          <Link to={`../${father.slug}`}>{fatherName}</Link>
        ) : (
          <>
            {fatherName || '-'}
          </>
        )}
      </td>
    </tr>
  );
};
