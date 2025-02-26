import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink/PersonLink';
import { PeopleContext } from '../PeopleContext/PeopleContext';

type Props = {
  loader: boolean;
  errorLoading: boolean;
};

export const PeopleTable: React.FC<Props> = ({ loader, errorLoading }) => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('PeoplePage must be used within a PeopleProvider');
  }

  const { people } = context;

  const { slug } = useParams();

  const parentSlug = (name: string) => {
    return people.find(person => person.name === name)?.slug;
  };

  return (
    <div className="box table-container">
      {loader && <Loader />}

      {errorLoading && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loader && (!people || people.length === 0) && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {people && people.length && (
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
            {people?.map((person, index) => (
              <tr
                data-cy="person"
                key={index}
                className={classNames({
                  'has-background-warning': slug === person.slug,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    parentSlug(person.motherName) ? (
                      <Link
                        className={classNames({
                          'has-text-danger': parentSlug(person.motherName),
                        })}
                        to={`./${parentSlug(person.motherName)}`}
                      >
                        {person.motherName}
                      </Link>
                    ) : (
                      person.motherName
                    )
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    parentSlug(person.fatherName) ? (
                      <Link to={`./${parentSlug(person.fatherName)}`}>
                        {person.fatherName}
                      </Link>
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
    </div>
  );
};
