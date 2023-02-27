import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { extendPeople } from '../../utils/extendPeople';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();

  const isServerEmpty = people.length === 0 && !isLoading && !isError;
  const isDataLoaded = people.length > 0 && !isLoading && !isError;

  const loadPeopleFromServer = async () => {
    try {
      const loadedPeople = await getPeople();

      const peopleExtended = extendPeople(loadedPeople);

      setPeople(peopleExtended);
      setIsLoading(false);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isDataLoaded && (
            <PeopleTable selectedPerson={slug} people={people} />
          )}

          {isServerEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
});
