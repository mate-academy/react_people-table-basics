import { FC, memo } from 'react';
import classNames from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = memo(({ person }) => {
  const { slug: currentUser } = useParams();

  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === currentUser,
      })}
    >
      <td>
        <NavLink
          to={`../${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {
        mother ? (
          <td>
            <NavLink
              to={`../${mother.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </NavLink>
          </td>
        )
          : (
            <td>{motherName || '-'}</td>
          )
      }

      {
        father ? (
          <td>
            <NavLink
              to={`../${father.slug}`}
            >
              {fatherName}
            </NavLink>
          </td>
        )
          : (
            <td>{fatherName || '-'}</td>
          )
      }
    </tr>
  );
});
