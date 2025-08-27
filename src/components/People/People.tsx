import { Loader } from '../Loader';
import { Person } from '../../types';
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { arePeopleEmpty } from '../../utils/arePeopleEmpty';
import cn from 'classnames';
import { getMotherOrFatherByName } from '../../utils/getMotherOrFatherByName';

type Props = {
  people: Person[];
  isLoading: boolean;
  errorMessage: string;
};

export const People: React.FC<Props> = ({
  people,
  isLoading,
  errorMessage,
}) => {
  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading || arePeopleEmpty(people) || errorMessage ? (
        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {!isLoading && errorMessage && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                errorMessage
              </p>
            )}

            {!isLoading && !errorMessage && arePeopleEmpty(people) && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}
          </div>
        </div>
      ) : (
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
            {people.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={cn({
                  'has-background-warning': person.slug === slug,
                })}
              >
                <td>
                  <NavLink
                    to={`/people/${person.slug}`}
                    className={cn({ 'has-text-danger': person.sex === 'f' })}
                  >
                    {person.name}
                  </NavLink>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    getMotherOrFatherByName(people, person.motherName) ? (
                      <NavLink
                        to={`/people/${getMotherOrFatherByName(people, person.motherName)}`}
                        className={cn({ 'has-text-danger': person.motherName })}
                      >
                        {person.motherName}
                      </NavLink>
                    ) : (
                      person.motherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    getMotherOrFatherByName(people, person.fatherName) ? (
                      <NavLink
                        to={`/people/${getMotherOrFatherByName(people, person.fatherName)}`}
                      >
                        {person.fatherName}
                      </NavLink>
                    ) : (
                      person.fatherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
