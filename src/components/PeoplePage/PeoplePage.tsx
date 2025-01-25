import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeople } from '../../api';
import { Loader } from '../Loader/Loader';
import { PersonInfo } from '../PersonInfo/PersonInfo';

import { Person } from '../../types';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [peoplelist, setPeopleList] = useState<Person[]>([]);
  const findParent = (parentName: string | null) =>
    peoplelist.find(person => person.name === parentName);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeopleList)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && peoplelist.length !== 0 && (
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
                {peoplelist.map(person => (
                  <PersonInfo
                    key={person.slug}
                    person={person}
                    slug={slug}
                    isParentInList={findParent}
                  />
                ))}
              </tbody>
            </table>
          )}

          {!isLoading && peoplelist.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </div>
  );
};
