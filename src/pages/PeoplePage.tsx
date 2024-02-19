import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import Table from '../components/Table';
import { Loader } from '../components/Loader';

const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const response = await getPeople();

        setPeople(response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {people.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : (
                    <Table people={people} />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
