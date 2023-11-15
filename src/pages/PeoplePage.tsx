import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import PeopleTable from '../components/PeopleTable';

const PeoplePage = () => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((people) => {
        setData(people);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {data.length === 0 && !isLoading && !errorMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {(data.length > 0 && !isLoading && !errorMessage) && (
            <PeopleTable people={data} />
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
