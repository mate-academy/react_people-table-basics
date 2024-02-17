import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

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
          const mother = people.find(el => el.name === person.motherName);
          const father = people.find(el => el.name === person.fatherName);

          return (
            <tr
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
              data-cy="person"
              key={person.slug}
            >
              <td>
                <a
                  className={cn({
                    'has-text-danger': person.sex === 'f',
                  })}
                  href={`#/people/${person.slug}`}
                >
                  {person.name}
                </a>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {mother ? (
                <td>
                  <a
                    className={cn({
                      'has-text-danger': mother.sex === 'f',
                    })}
                    href={`#/people/${mother.slug}`}
                  >
                    {mother.name}
                  </a>
                </td>
              ) : (
                <td>{person.motherName ? person.motherName : '-'}</td>
              )}
              {father ? (
                <td>
                  <a
                    className={cn({
                      'has-text-danger': father.sex === 'f',
                    })}
                    href={`#/people/${father.slug}`}
                  >
                    {father.name}
                  </a>
                </td>
              ) : (
                <td>{person.fatherName ? person.fatherName : '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
