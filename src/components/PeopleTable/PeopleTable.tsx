import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  people: Person[];
  slug: string | undefined;
};

export const PeopleTable: React.FC<Props> = ({ people, slug }) => {
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
        {people.map(person => {
          const motherPerson = person.mother;
          const fatherPerson = person.father;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {motherPerson ? (
                  <Link
                    to={`/people/${motherPerson.slug}`}
                    className={
                      motherPerson.sex === 'f' ? 'has-text-danger' : ''
                    }
                  >
                    {motherPerson.name}
                  </Link>
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {fatherPerson ? (
                  <Link to={`/people/${fatherPerson.slug}`}>
                    {fatherPerson.name}
                  </Link>
                ) : person.fatherName ? (
                  person.fatherName
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
