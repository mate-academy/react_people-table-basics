import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeoplesWithParents } from '../helpers/getPeoplesWithParents';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const isAviablePeople = peoples.length > 0;

  const fetchData = async () => {
    try {
      const data = await getPeople();
      const preparedData = getPeoplesWithParents(data);

      setPeoples(preparedData);
    } catch (error) {
      setLoadError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {loadError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isAviablePeople && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isAviablePeople && !isLoading && <PeopleTable people={peoples} />}
        </div>
      </div>
    </>
  );
};
