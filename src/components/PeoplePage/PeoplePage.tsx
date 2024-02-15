import { useEffect, useState } from 'react';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [isNotPeople, setIsNotPeople] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await getPeople();

        if (data.length === 0) {
          setIsNotPeople(true);
        } else {
          setPeople(data);
        }
      } catch {
        setIsError(true);
        setIsNotPeople(true);
      } finally {
        setIsLoading(false);
        setIsError(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          <PeopleTable people={people} />
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Sometimes went wrong
            </p>
          )}
          {isNotPeople && isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
