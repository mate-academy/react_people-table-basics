import React from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { NoPeopleOnServer } from '../NoPeopleOnServer';

interface Props {
  peoples: Person[];
}
export enum Sex {
  MALE = 'm',
  FEMALE = 'f',
}

export const PeopleTable: React.FC<Props> = (props) => {
  const { peoples } = props;

  const { peopleId } = useParams();

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

      {peoples.length === 0 ? (
        <NoPeopleOnServer />
      ) : (
        <tbody>
          {
            peoples.map(people => (
              <tr
                key={people.slug}
                data-cy="person"
                className={classNames(
                  { 'has-background-warning': peopleId === people.slug },
                )}
              >
                <td>
                  <Link
                    to={`../${people.slug}`}
                    className={classNames(
                      { 'has-text-danger': people.sex === Sex.FEMALE },
                    )}
                  >
                    {people.name}
                  </Link>
                </td>

                <td>{people.sex}</td>
                <td>{people.born}</td>
                <td>{people.died}</td>

                <td>
                  {people.mother ? (
                    <Link
                      className="has-text-danger"
                      to={`../${people.mother?.slug}`}
                    >
                      {people.motherName}
                    </Link>
                  ) : (
                    <p>{people.motherName || '-'}</p>
                  )}
                </td>

                <td>
                  {people.father ? (
                    <Link to={`../${people.father?.slug}`}>
                      {people.fatherName}
                    </Link>
                  ) : (
                    <p>{people.fatherName || '-'}</p>
                  )}
                </td>
              </tr>
            ))
          }
        </tbody>
      )}
    </table>
  );
};
