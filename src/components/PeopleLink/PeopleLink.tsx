import classNames from 'classnames';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PeopleLink: FC<Props> = ({
  people,
  person,
}) => {
  const location = useLocation().pathname;
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;
  const mother = people.find((p) => p.name === motherName);
  const father = people.find((p) => p.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': `/people/${slug}` === location },
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
      <td>
        {mother
          ? (
            <NavLink
              to={`/people/${mother.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </NavLink>
          ) : motherName || '-'}
      </td>

      <td>
        {father
          ? (
            <NavLink to={`/people/${father.slug}`}>
              {fatherName}
            </NavLink>
          ) : fatherName || '-'}
      </td>
    </tr>
  );
};
