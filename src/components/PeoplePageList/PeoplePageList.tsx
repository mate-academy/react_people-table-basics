import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  people: Person[],
};

const parentLink = (parent: Person) => (
  <Link
    to={`/people/${parent.slug}`}
    className={classNames({
      'has-text-danger': parent.sex === 'f',
    })}
  >
    {parent.name}
  </Link>
);

export const PeoplePageList: React.FC<Props> = ({ people }) => {
  const { slug: NeededSlug = '' } = useParams();

  return (
    <>
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
          {people.map((person: Person) => (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': NeededSlug === person.slug,
              })}
            >
              <td>
                <a
                  href="#/people/jan-van-brussel-1714"
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </a>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  parentLink(person.mother)
                ) : (
                  person.motherName
                )}
              </td>
              <td>
                {person.father ? (
                  parentLink(person.father)
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
