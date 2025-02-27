import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

const getLinkClass = (sex: string) =>
  classNames({
    'has-text-danger': sex === 'f',
  });

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const selectedUserSlug = slug;

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
          {people.map(person => {
            const motherSlug = people.find(
              personMother => personMother.name === person.motherName,
            )?.slug;
            const fatherSlug = people.find(
              personFather => personFather.name === person.fatherName,
            )?.slug;

            return (
              <tr
                data-cy="person"
                key={person.name + person.born}
                className={classNames(
                  selectedUserSlug === person.slug && 'has-background-warning',
                )}
              >
                <td>
                  <Link
                    to={`../${person.slug}`}
                    className={getLinkClass(person.sex)}
                  >
                    {person.name}
                  </Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName !== null ? (
                    motherSlug ? (
                      <Link to={`../${motherSlug}`} className="has-text-danger">
                        {person.motherName}
                      </Link>
                    ) : (
                      <p>{person.motherName}</p>
                    )
                  ) : (
                    <p>-</p>
                  )}
                </td>
                <td>
                  {person.fatherName !== null ? (
                    fatherSlug ? (
                      <Link to={`../${fatherSlug}`}>{person.fatherName}</Link>
                    ) : (
                      <p>{person.fatherName}</p>
                    )
                  ) : (
                    <p>-</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
