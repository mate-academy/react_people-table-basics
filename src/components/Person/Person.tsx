import classNames from 'classnames';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  personInfo: Person
  people: Person[]
};

export const PersonInfo: React.FC<Props> = ({ personInfo, people }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = personInfo;

  const findParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <NavLink
          to={`/people/${parent.slug}`}
          className={classNames({ 'has-text-danger': parent.sex === 'f' })}
        >
          {parentName}
        </NavLink>
      );
    }

    return parentName || '-';
  };

  return (
    <>
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{findParent(motherName)}</td>
      <td>{findParent(fatherName)}</td>
    </>
  );
};
