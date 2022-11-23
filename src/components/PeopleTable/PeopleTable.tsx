import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';
import { ErrorMassege } from '../../types/ErrorMassege';
import { Error } from '../../types/Error';

type Props = {
  people: Person[],
  isLoading: boolean,
  isError: Error,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  isError,
}) => {
  const { personData = '' } = useParams();

  const displayError = useCallback((error: Error) => {
    switch (error.notification) {
      case ErrorMassege.Load:
        return (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error.notification}
          </p>
        );

      case ErrorMassege.Empty:
        return (
          <p data-cy="noPeopleMessage">
            {error.notification}
          </p>
        );
      default:
        return '';
    }
  }, []);

  const findParent = useCallback((parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const possibleParent = people.find(person => person.name === parentName);

    return possibleParent
      ? <PersonLink person={possibleParent} />
      : parentName;
  }, [people]);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading
          ? <Loader />
          : (isError.status && displayError(isError))}
        {(!isLoading && !isError.status) && (
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
              {people.map((person) => (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames(
                    { 'has-background-warning': person.slug === personData },
                  )}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {findParent(person.motherName)}
                  </td>
                  <td>
                    {findParent(person.fatherName)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
