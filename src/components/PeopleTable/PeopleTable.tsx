import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

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
        {people.map((person: Person) => {
          const mother = person.motherName || '-';
          const father = person.fatherName || '-';

          const samePersonMother = people?.find(
            el => el.name === person.motherName,
          );

          const samePersonFather = people?.find(
            el => el.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={classNames('', {
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {samePersonMother ? (
                  <Link
                    to={`/people/${samePersonMother.slug}`}
                    className="has-text-danger"
                  >
                    {mother}
                  </Link>
                ) : (
                  mother
                )}
              </td>
              <td>
                {samePersonFather ? (
                  <Link to={`/people/${samePersonFather.slug}`}>{father}</Link>
                ) : (
                  father
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
