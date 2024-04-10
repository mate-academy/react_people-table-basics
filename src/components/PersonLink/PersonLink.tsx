import { Link, useParams } from 'react-router-dom';

import cn from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { path } = useParams();

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

  const male = sex === 'm';

  return (
    <tr
      data-cy="person"
      key={slug}
      className={cn({
        'has-background-warning': slug === path,
      })}
    >
      <td>
        <Link
          to={slug}
          className={cn({
            'has-text-danger': !male,
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
          <Link className="has-text-danger" to={`/people/${mother.slug}`}>
            {motherName}
          </Link>
        )}
        {!mother && (motherName || '-')}
      </td>

      <td>
        {father && <Link to={`/people/${father.slug}`}>{fatherName}</Link>}
        {!father && (fatherName || '-')}
      </td>
    </tr>
  );
};
