import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../../types';

type PersonListProps = {
  people: Person[];
};

export const PersonList: React.FC<PersonListProps> = ({ people }) => {
  const { name } = useParams();

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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={`${name === person.slug && 'has-background-warning'}`}
          >
            <td>
              <NavLink
                to={`/people/${person.slug}`}
                className={`${person.sex === 'f' && 'has-text-danger'}`}
              >
                {person.name}
              </NavLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother ? (
              <td>
                <NavLink
                  to={`/people/${person.mother.slug}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </NavLink>
              </td>
            ) : (
              <td>{person.motherName || '-'}</td>
            )}
            {person.father ? (
              <td>
                <NavLink to={`/people/${person.father.slug}`}>
                  {person.fatherName}
                </NavLink>
              </td>
            ) : (
              <td>{person.fatherName || '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
