import { FC, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import cn from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

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
          const personMother = people.find(
            mother => mother.name === person.motherName,
          );

          const personFather = people.find(
            father => father.name === person.fatherName,
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={cn({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {person.motherName ? (
                personMother ? (
                  <td>
                    <Link
                      to={`/people/${personMother.slug}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  </td>
                ) : (
                  <td>{person.motherName}</td>
                )
              ) : (
                <td>-</td>
              )}
              {person.fatherName ? (
                personFather ? (
                  <td>
                    <Link to={`/people/${personFather.slug}`}>
                      {person.fatherName}
                    </Link>
                  </td>
                ) : (
                  <td>{person.fatherName}</td>
                )
              ) : (
                <td>-</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
