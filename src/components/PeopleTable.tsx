import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

type Props = {
  allPeople: Person[];
  slug: string | undefined;
};

export const PeopleTable: React.FC<Props> = ({ allPeople, slug }) => {
  return (
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
        {allPeople.map(personOld => {
          const mother = allPeople.find(
            onePerson => onePerson.name === personOld.motherName,
          );
          const father = allPeople.find(
            onePerson => onePerson.name === personOld.fatherName,
          );

          const person = {
            ...personOld,
            mother: mother,
            father: father,
          };

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
              key={person.slug}
            >
              <td>
                <NavLink
                  to={`/people/${person.slug}`}
                  className={classNames({
                    'has-text-danger': person.sex !== 'm',
                  })}
                >
                  {person.name}
                </NavLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  person.mother ? (
                    <Link
                      to={`/people/${person.mother.slug}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  person.father ? (
                    <Link to={`/people/${person.father.slug}`}>
                      {person.fatherName}
                    </Link>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
