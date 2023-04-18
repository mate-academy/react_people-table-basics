import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);

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

    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            ? (
              <Loader />
            ) : (
              <PeopleTable
                people={people}
                personId={slug}
              />
            )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(people.length === 0 && !isLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
