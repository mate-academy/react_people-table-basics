import classNames from 'classnames';
import React, { } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

const IS_WOMAN = 'f';

const createLink = (person: Person) => {
  return (
    <Link
      to={`../${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === IS_WOMAN,
      })}
    >
      {person.name}
    </Link>
  );
};

const isParent = (
  person: Person,
  people: Person[] | null,
  parentSex: string | null = null,
) => {
  const parentName = !parentSex
    ? person.fatherName
    : person.motherName;

  const parent = people?.find(personItem => (
    personItem.name === parentName
  ));

  if (parent) {
    return createLink(parent);
  }

  if (parentName) {
    return parentName;
  }

  return '-';
};

type PersonLinkProps = {
  person: Person,
  people: Person[] | null,
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person, people }) => {
  const {
    sex,
    born,
    died,
  } = person;

  return (
    <>
      <td>
        {createLink(person)}
      </td>

      <td>
        {sex}
      </td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {isParent(person, people, IS_WOMAN)}
      </td>
      <td>
        {isParent(person, people)}
      </td>
    </>
  );
};
