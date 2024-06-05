import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ people }) => {
  const { selectedPersonSlug } = useParams();
  const selectedPerson = people.find(
    person => person.slug === selectedPersonSlug,
  );

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
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person === selectedPerson ? 'has-background-warning' : undefined
              }
            >
              <td>
                <Link
                  to={`../${person.slug}`}
                  className={person.sex === 'f' ? 'has-text-danger' : undefined}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              {!!person.mother ? (
                <td>
                  <Link
                    to={`../${person.mother.slug}`}
                    className="has-text-danger"
                  >
                    {person.mother.name}
                  </Link>
                </td>
              ) : (
                <td>{!!person.motherName ? person.motherName : '-'}</td>
              )}

              {!!person.father ? (
                <td>
                  <Link to={`../${person.father.slug}`}>
                    {person.father.name}
                  </Link>
                </td>
              ) : (
                <td>{!!person.fatherName ? person.fatherName : '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
