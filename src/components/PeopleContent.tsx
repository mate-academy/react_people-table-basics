import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

import { Loader } from './Loader';
import { Person } from '../types';
import { TABLE_COLUMNS, FEMALE } from '../variables/variables';

type Props = {
  people: Person[],
  isError: boolean,
  isLoading: boolean,
};

export const PeopleContent: React.FC<Props> = ({
  people,
  isError,
  isLoading,
}) => {
  const { personId } = useParams();

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (!people.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_COLUMNS.map(column => (
            <th>
              {column}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,

          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({
                'has-background-warning': personId === slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${slug}`}
                  className={cn({
                    'has-text-danger': sex === FEMALE,
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>
                {sex}
              </td>
              <td>
                {born}
              </td>
              <td>
                {died}
              </td>
              <td>
                {mother?.slug ? (
                  <Link
                    className="has-text-danger"
                    to={`/people/${mother?.slug}`}
                  >
                    {motherName}
                  </Link>
                ) : (
                  motherName
                )}
              </td>
              <td>
                {father ? (
                  <Link
                    to={`/people/${father?.slug}`}
                  >
                    {fatherName}
                  </Link>
                ) : (
                  fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
