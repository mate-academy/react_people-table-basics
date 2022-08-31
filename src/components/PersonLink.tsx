import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
  slugMan: string;
  perentsMother: Person | null;
  perentsFather: Person | null;
}

export const PersonLink: React.FC<Props> = ({
  person, slugMan, perentsMother, perentsFather,
}) => {
  const isSelected = person.slug === slugMan;

  const {
    name, sex, born, died, slug, motherName, fatherName,
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
          to={`../${slug}`}
          className={() => classNames(
            { 'has-text-danger': person.sex === 'f' },
          )}
          replace
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {perentsMother ? (
        <td>
          <NavLink to={`../${perentsMother.slug}`}>
            {motherName}
          </NavLink>
        </td>
      ) : (
        <td>
          {motherName?.length ? (
            motherName
          ) : (
            '-'
          )}
        </td>
      )}
      {perentsFather ? (
        <td>
          <NavLink to={`../${perentsFather.slug}`}>
            {fatherName}
          </NavLink>
        </td>
      ) : (
        <td>
          {fatherName?.length ? (
            fatherName
          ) : (
            '-'
          )}
        </td>
      )}
    </tr>
  );
};
