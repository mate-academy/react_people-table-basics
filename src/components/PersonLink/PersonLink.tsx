import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  setIsActiveRow: (arg: string) => void,
  isActiveRow: string,
};

export const PerosnLink: React.FC<Props> = ({
  person,
  setIsActiveRow,
  isActiveRow,
}) => {
  const {
    name,
    sex,
    born,
    died,
    mother,
    father,
    fatherName,
    motherName,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isActiveRow === slug })}
    >
      <td>
        <NavLink
          to={`/people/${slug}`}
          className={(sex === 'f' ? 'has-text-danger' : '')}
          onClick={() => setIsActiveRow(slug)}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {mother ? (
        <td>
          <Link
            className="has-text-danger"
            to={`/people/${mother.slug}`}
            onClick={() => setIsActiveRow(mother.slug)}
          >
            {mother.name}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-' }</td>
      )}

      {father ? (
        <td>
          <Link
            to={`/people/${father.slug}`}
            onClick={() => setIsActiveRow(father.slug)}
          >
            {father.name}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
