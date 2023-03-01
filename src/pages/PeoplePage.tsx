import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { peopleSlug = '' } = useParams();

  const loadPeoples = useCallback(async () => {
    try {
      const peoplesFromServer = await getPeople();

      setPeople(peoplesFromServer);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    loadPeoples();
  }, []);

  const showLoader = isLoading && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {showLoader
            ? <Loader />
            : (
              <PeopleTable
                people={people}
                isError={isError}
                selectedPersonSlug={peopleSlug}
              />
            )}
        </div>
      </div>
    </>
  );
};
