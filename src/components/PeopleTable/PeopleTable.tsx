import React from 'react';
import { Person } from '../../types';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';

type PeopleTableProps = {
  peopleList: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ peopleList }) => {
  const { slug: selectedSlug } = useParams();

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
        {peopleList.map(person => {
          const mother = peopleList.find(p => p.name === person.motherName);
          const father = peopleList.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': selectedSlug === person.slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={cn({ 'has-text-danger': person.sex === 'f' })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {!person.motherName ? (
                  '-'
                ) : mother ? (
                  <Link
                    to={`/people/${mother.slug}`}
                    className={cn('has-text-danger')}
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName
                )}
              </td>

              <td>
                {!person.fatherName ? (
                  '-'
                ) : father ? (
                  <Link to={`/people/${father.slug}`}>{father.name}</Link>
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
