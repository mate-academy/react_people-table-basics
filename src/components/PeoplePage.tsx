import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  const getPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {isLoading && (
            <Loader />
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!people.length && !isError && !isLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length && !isLoading && !isError
            ? (
              <PeopleTable
                people={people}
                slug={slug}
              />
            ) : (<></>)}

        </div>
      </div>
    </>
  );
};
