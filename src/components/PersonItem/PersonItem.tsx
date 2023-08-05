import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';

import { PersonLink } from '../PersonLink';

type Props = {
  person: Person
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    slug: personSlug,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          to={`../${personSlug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          `${motherName || '-'}`
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          `${fatherName || '-'}`
        )}
      </td>
    </tr>
  );
};
