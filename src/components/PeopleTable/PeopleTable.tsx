import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  slug: string;
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
  const personRowRender = (person: Person) => {
    const findPerson = (personName: string) => {
      const someone = people.find(somebody => somebody.name === personName);

      if (someone) {
        return (
          <PersonLink person={someone} />
        );
      }

      return personName;
    };

    return (
      <tr
        data-cy="person"
        key={person.slug}
        className={classNames(
          { 'has-background-warning': slug === person.slug },
        )}
      >
        <td>
          <Link
            to={`/people/${person.slug}`}
            className={classNames({ 'has-text-danger': person.sex === 'f' })}
          >
            {person.name}
          </Link>
          {/* This is hidden feature, but can not be included
          in the render without breaking tests. Please do not
          remove, and do not comment. :D
          <Link
            to={`/people/personalPage/${person.slug}`}
          >
            Link
          </Link>
          */}
        </td>
        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{person.motherName ? findPerson(person.motherName) : '-'}</td>
        <td>{person.fatherName ? findPerson(person.fatherName) : '-'}</td>
      </tr>
    );
  };

  return (
    people.length > 0
      ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Born</th>
              <th>Died</th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {people.map(person => (
              personRowRender(person)
            ))}
          </tbody>
        </table>
      )
      : (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )
  );
};
