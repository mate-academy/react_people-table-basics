import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  to: string,
  person: Person,
  isExistPerson: (parent: string | null) => boolean | undefined,
  selectedPerson: string,
  getParentSlug: (parentName: string | null) => string | undefined,
};

export const PersonLink: FC<Props> = ({
  to,
  person,
  isExistPerson,
  selectedPerson,
  getParentSlug,
}) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames(
        '',
        { 'has-background-warning': slug === selectedPerson },
      )}
    >
      <td>
        <NavLink
          to={`../${to}`}
          className={classNames(
            '',
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
        {isExistPerson(motherName) ? (
          <NavLink to={`../${getParentSlug(motherName)}` || ''} className="has-text-danger">
            {motherName}
          </NavLink>
        ) : (
          <p>{motherName || '-'}</p>
        )}
      </td>
      <td>
        {isExistPerson(fatherName) ? (
          <NavLink to={`../${getParentSlug(fatherName)}` || ''}>
            {fatherName}
          </NavLink>
        ) : (
          <p>{fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
