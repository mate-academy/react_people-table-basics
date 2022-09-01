import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from './Loader/Loader';
import { PersonLink } from './PersonLink';

interface Props {
  peoples: Person[],
  error: string
  isLoading: boolean
}

export const PeoplesPage: React.FC<Props> = ({ peoples, error, isLoading }) => {
  const { peopleSlug = '' } = useParams();

  const getParent = (parentName: string | null) => {
    return peoples.find(person => person.name === parentName) || null;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="container">
        <div className="block">
          <div className="box table-container">
            {isLoading
              ? (
                <>
                  {error === 'Something went wrong' && (
                    <p
                      data-cy="peopleLoadingError"
                      className="has-text-danger"
                    >
                      Something went wrong
                    </p>
                  )}

                  {error === '' && peoples.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  <table
                    data-cy="peopleTable"
                    className="
                      table
                      is-striped is-hoverable
                      is-narrow is-fullwidth"
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
                      {peoples.map(person => (
                        <PersonLink
                          key={person.slug}
                          person={person}
                          slugMan={peopleSlug}
                          perentsMother={getParent(person.motherName)}
                          perentsFather={getParent(person.fatherName)}
                        />
                      ))}
                    </tbody>
                  </table>
                </>
              )
              : <Loader />}
          </div>
        </div>
      </div>
    </>
  );
};
