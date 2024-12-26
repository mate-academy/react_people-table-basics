import classNames from 'classnames';
import { Person } from '../../types';
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const peopleWithParents = people.map(person => {
    const mother = people.find(moth => moth.name === person.motherName) || null;
    const father = people.find(fath => fath.name === person.fatherName) || null;

    return { ...person, mother, father };
  });

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
        {peopleWithParents.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <NavLink
                to={`${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </NavLink>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <NavLink
                  to={`${person.mother?.slug}`}
                  className={'has-text-danger'}
                >
                  {person.motherName}
                </NavLink>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <NavLink to={`${person.father?.slug}`}>
                  {person.fatherName}
                </NavLink>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
