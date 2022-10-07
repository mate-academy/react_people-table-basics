import classNames from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  to: string;
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ to, person }) => {
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

  const location = useLocation().pathname;

  return (
    <tr
      data-cy="person"
      className={(`/people/${slug}` === location && 'has-background-warning') || ''}
    >
      <td>
        <NavLink
          to={to}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </NavLink>
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
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link
            to={`/people/${father.slug}`}
            className="has-text-danger"
          >
            {father.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
