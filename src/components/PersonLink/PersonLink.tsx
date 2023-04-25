import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  motherLink: Person | null,
  fatherLink: Person | null,
  selectedSlug: string,
};

export const PersonLink: React.FC<Props> = ({
  person, motherLink, fatherLink, selectedSlug,
}) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === selectedSlug,
      })}
    >
      <td>
        <NavLink
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherLink ? (
          <NavLink
            to={`/people/${motherLink.slug}`}
          >
            {motherLink.name}
          </NavLink>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {fatherLink ? (
          <NavLink
            to={`/people/${fatherLink.slug}`}
          >
            {fatherLink.name}
          </NavLink>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
