import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
  loading: boolean,
  isError: boolean,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  loading,
  isError,
}) => {
  const { personData = '' } = useParams();

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
        {loading
          ? <Loader />
          : (isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )) || ((people.length === 0) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )) || (
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
                    key={person.name}
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
