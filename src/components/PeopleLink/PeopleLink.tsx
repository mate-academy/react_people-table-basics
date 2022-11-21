import classNames from 'classnames';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PeopleLink: FC<Props> = ({
  person,
}) => {
  const location = useLocation().pathname;
  const {
    name,
    sex,
    born,
    died,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-grey-lighter': `/people/${slug}` === location },
      )}
    >
      <td>
        <NavLink
          to={`/people/${slug}`}
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
    </tr>
  );
};
