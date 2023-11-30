import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../Loader';
import { PeopleContext } from '../../context/PeopleContext';

export const PeoplePage: React.FC = () => {
  const { dispatch } = useContext(PeopleContext);
  const { state } = useContext(PeopleContext);
  const {
    isLoading, people, selectedPerson, error,
  } = state;

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!people && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {error ? (
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
                        onClick={() => dispatch(
                          { type: 'SELECT_PERSON', payload: person.slug },
                        )}
                      >
                        {person.name}
                      </Link>
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>{person.motherName}</td>
                    <td>{person.fatherName}</td>
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

// to make my jsx cleaner I can create a file for dispatchActions instead?
