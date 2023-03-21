import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  selected: string;
  mother: Person | undefined;
  father: Person | undefined;
};

export const PersonInfo: React.FC<Props> = ({
  person, selected, mother, father,
}) => {
  const {
    name, sex, born, died, motherName, fatherName, slug,
  } = person;
  const isSelected = (user:Person) => user.slug === selected;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': isSelected(person) },
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
      <td>
        {sex}
      </td>
      <td>
        {born}
      </td>
      <td>
        {died}
      </td>
      <td>
        {mother
          ? (
            <NavLink
              to={`/people/${mother.slug}`}
              className="has-text-danger"
            >
              {mother.name}
            </NavLink>
          )
          : (motherName || '-')}
      </td>
      <td>
        {father
          ? (
            <NavLink
              to={`/people/${father.slug}`}
            >
              {father.name}
            </NavLink>
          )
          : (fatherName || '-')}
      </td>
    </tr>
  );
};
