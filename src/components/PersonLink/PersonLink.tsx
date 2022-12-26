import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  isSelected: boolean;
};

export const PersonLink: FC<Props> = ({ person, isSelected }) => {
  const {
    slug,
    name,
    sex,
    born,
    died,
    fatherName,
    father,
    motherName,
    mother,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <NavLink
          to={`/people/${slug}`}
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
      <td>
        {mother
          ? (
            <NavLink
              to={`/people/${mother.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </NavLink>
          )
          : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <NavLink to={`/people/${father.slug}`}>
              {fatherName}
            </NavLink>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
