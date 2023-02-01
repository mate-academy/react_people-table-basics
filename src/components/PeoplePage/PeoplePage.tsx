import React, {
  memo, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { PeopleList } from './PeopleList/PeopleList';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { getPreparedPeople } from '../helpers/getPrepearedPeople';
import { Loader } from '../Loader';

export const PeoplePage: React.FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { slug = null } = useParams();

  const loadPeople = async () => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      const getPeopleFromServer = await getPeople();
      const preparedPeople = getPreparedPeople(getPeopleFromServer);

      setPeople(preparedPeople);
      setIsDataLoaded(true);
    } catch (error) {
      setErrorMessage('Can\'t load people');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const isPeopleLoaded = useMemo(() => (
    isDataLoaded && people.length
  ), [isDataLoaded, people]);

  return (
    <div className="block">
      <div className="box table-container">
        <h1 className="title">People Page</h1>
        {isLoading
          ? <Loader />
          : (
            <>
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {isPeopleLoaded
                ? <PeopleList people={people} selectedPerson={slug} />
                : (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
            </>
          )}
      </div>
    </div>
  );
});
