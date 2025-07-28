import React from 'react';
import { usePeopleContext } from '../context/PeopleContext';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

export const Peoples: React.FC = () => {
  const { peoples, isLoading, peopleLoadingError } = usePeopleContext();
  const { slug: currentPersonSlug } = useParams();

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {peopleLoadingError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {peopleLoadingError}
              </p>
            )}

            {peoples?.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <>
                {isLoading ? (
                  <Loader />
                ) : (
                  <table
                    data-cy="peopleTable"
                    className="table
                      is-striped
                      is-hoverable
                      is-narrow
                      is-fullwidth"
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
                      {peoples?.map(person => {
                        const motherPerson = peoples.find(
                          p => p.name === person.motherName && p.slug,
                        );

                        const fatherPerson = peoples.find(
                          p => p.name === person.fatherName && p.slug,
                        );

                        return (
                          <tr
                            key={person.name}
                            data-cy="person"
                            className={
                              currentPersonSlug === person.slug
                                ? 'has-background-warning'
                                : ''
                            }
                          >
                            <td>
                              <PersonLink person={person} />
                            </td>
                            <td>{person.sex}</td>
                            <td>{person.born}</td>
                            <td>{person.died}</td>
                            <td>
                              {person.motherName === null ? (
                                '-'
                              ) : motherPerson ? (
                                <PersonLink person={motherPerson} />
                              ) : (
                                person.motherName
                              )}
                            </td>
                            <td>
                              {person.fatherName === null ? (
                                '-'
                              ) : fatherPerson ? (
                                <PersonLink person={fatherPerson} />
                              ) : (
                                person.fatherName
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
