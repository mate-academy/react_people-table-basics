import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../Loader';
import { PeopleContext } from '../../context/PeopleContext';
import {
  selectPerson, DispatchFunction,
} from '../../context/PeopleActions';
import { Person } from '../../types';
import { ErrorType } from '../../types/ErrorType';

export const PeoplePage: React.FC = () => {
  const { dispatch } = useContext(PeopleContext);
  const { state } = useContext(PeopleContext);
  const {
    isLoading, people, selectedPerson, error,
  } = state;

  const createParentLink = (
    parentName: string | null,
    peopleArray: Person[],
    localDispatch: DispatchFunction,
  ) => {
    const parent = peopleArray.find(p => p.name === parentName);
    const parentSlug = parent ? parent.slug : null;
    const className = parent?.sex === 'f' ? 'has-text-danger' : '';

    return parentSlug ? (
      <Link
        to={`/people/${parentSlug}`}
        onClick={() => localDispatch(
          { type: 'SELECT_PERSON', payload: parentSlug },
        )}
        className={className}
      >
        {parentName}
      </Link>
    ) : parentName;
  };

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error === ErrorType.EMPTY_ERROR && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {error === ErrorType.FETCH_ERROR ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
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
                    key={person.slug}
                    className={cn({
                      'has-background-warning':
                        person.slug === selectedPerson?.slug,
                    })}
                  >
                    <td>
                      <Link
                        to={`/people/${person.slug}`}
                        className={person.sex === 'f' ? 'has-text-danger' : ''}
                        onClick={() => selectPerson(dispatch, person.slug)}
                      >
                        {person.name}
                      </Link>
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {createParentLink(person.motherName, people, dispatch)}
                    </td>
                    <td>
                      {createParentLink(person.fatherName, people, dispatch)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
