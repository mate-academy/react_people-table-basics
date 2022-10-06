import { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: FC<Props> = ({ person, people }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const location = useLocation().pathname;

  const mother = people.find(human => human.name === motherName);
  const father = people.find(human => human.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={(`/people/${slug}` === location && 'has-background-warning') || ''}
    >
      <td>
        <NavLink
          to={`/people/${slug}`}
          className={sex === 'f' ? 'has-text-danger' : ''}
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
              {motherName}
            </Link>
          ) : motherName || '-'}
      </td>

      <td>
        {father
          ? (
            <Link to={`/people/${father.slug}`}>
              {fatherName}
            </Link>
          ) : fatherName || '-'}
      </td>
    </tr>
  );
};
