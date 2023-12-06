import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorType, setErrorType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataIsValid, setDataIsValid] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeople();

        if (!data || data.length === 0) {
          setErrorType('type1');
          setDataIsValid(false);
        } else {
          setPeople(data);
          setDataIsValid(true);
        }
      } catch (error) {
        setErrorType('type2');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader /> }

          {errorType === 'type1' && (
            <p data-cy="noPeopleMessage" className="has-text-danger">
              It seems there are no people on the server.
            </p>
          )}

          {errorType === 'type2' && (
            <p data-cy="peopleLoadingError">
              Something went wrong while fetching people data.
            </p>
          )}

          {dataIsValid && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
