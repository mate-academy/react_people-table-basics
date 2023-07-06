import React from 'react';
import classNames from 'classnames';
import { useParams, Link } from 'react-router-dom';
import { Person } from './types';

const FATHER = 'father';
const MOTHER = 'mother';
const FEMALE = 'f';
const NOT_SET_VALUE = '-';

interface ParentLink {
  person: Person,
  parentType: string,
  name: string,
  peopleList: Person[],
}

const getParentLink = (
  args: ParentLink,
) => {
  const {
    person,
    parentType,
    name,
    peopleList,
  } = args;
  const isMother = parentType === MOTHER;

  const parent = peopleList
    .find(personToFind => personToFind.name === name);

  if (parent) {
    return (
      <Link
        className={classNames(
          { 'has-text-danger': isMother },
        )}
        to={`/people/${parent.slug}`}
      >
        {isMother
          ? person.motherName
          : person.fatherName}
      </Link>
    );
  }

  return `${name}`;
};

interface Props {
  person: Person,
  people: Person[],
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const isFemale = person.sex === FEMALE;

  const { sex, born, died } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning':
          person.slug === slug,
      })}
    >
      <td>
        <Link
          className={classNames(
            { 'has-text-danger': isFemale },
          )}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {person.motherName
          ? (
            getParentLink({
              person,
              parentType: MOTHER,
              name: person.motherName,
              peopleList: people,
            })
          )
          : (NOT_SET_VALUE)}
      </td>
      <td>
        {person.fatherName
          ? (
            getParentLink({
              person,
              parentType: FATHER,
              name: person.fatherName,
              peopleList: people,
            })
          )
          : (NOT_SET_VALUE)}
      </td>
    </tr>
  );
};
