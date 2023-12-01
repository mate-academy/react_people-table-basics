import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [Error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataIsValid, setDataIsValid] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeople();

        if (!data || data.length === 0) {
          setError('type1');
          setDataIsValid(false);
        } else {
          setPeople(data);
          setDataIsValid(true);
        }
      } catch (error) {
        setError('type2');
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
          {isLoading ? <Loader /> : null}

          {Error === 'type1' && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              It seems there are no people on the server.
            </p>
          )}

          {Error === 'type2' && (
            <p data-cy="noPeopleMessage">
              Something went wrong while fetching people data.
            </p>
          )}

          {dataIsValid && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
