import { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';

type Props = {
  to: string;
  person: Person;
};

export const PersonLink: FC<Props> = ({ to, person }) => {
  const location = useLocation().pathname;
  const {
    name,
    slug,
    sex,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': `/people/${slug}` === location },
      )}
    >
      <td>
        <NavLink
          to={to}
          className={classNames(
            { 'has-text-danger': sex === 'f' },
          )}
        >
          {name}
        </NavLink>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <Link
              to={`/people/${mother.slug}`}
              className="has-text-danger"
            >
              {mother.name}
            </Link>
          )
          : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <Link to={`/people/${father.slug}`}>
              {father.name}
            </Link>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
