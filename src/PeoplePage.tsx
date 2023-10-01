import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PeopleContext } from './PeopleContext';
import { ErrorMessages } from './types/ErrorMessages';
import { Loader } from './components/Loader';
import { PersonLink } from './PersonLink';

export const PeoplePage: React.FC = () => {
  const { peopleList, isLoading, errorMessage } = useContext(PeopleContext);

  const isErrorBlockVisible = !peopleList.length || errorMessage || isLoading;

  const { peopleSlug } = useParams();
  const selectedPerson = peopleSlug;

  return (
    <>
      <h1 className="title">People Page</h1>

      {isErrorBlockVisible && (
        <div className="block">
          <div className="box table-container">
            {isLoading && (<Loader />)}

            {errorMessage === ErrorMessages.LoadError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {(!peopleList.length && !isLoading) && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
          </div>
        </div>
      )}

      {!!peopleList.length && (
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
            {peopleList.map(person => {
              const personMother = peopleList
                .find(mother => mother.name === person.motherName);
              const personFather = peopleList
                .find(father => father.name === person.fatherName);

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames({
                    'has-background-warning': selectedPerson === person.slug,
                  })}
                >
                  <td><PersonLink person={person} /></td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {personMother ? (
                      <PersonLink person={personMother} />
                    ) : (
                      person.motherName || '-'
                    )}
                  </td>
                  <td>
                    {personFather ? (
                      <PersonLink person={personFather} />
                    ) : (
                      person.fatherName || '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
