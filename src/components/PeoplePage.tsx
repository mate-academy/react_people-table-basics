import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import FetchError from './FetchError';
import NoPeopleMessage from './NoPeopleMessage';
import PeopleTable from './PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setIsError(true);
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
          {isLoading ? <Loader /> : <PeopleTable people={people} />}
          {isError && <FetchError />}
          {!isLoading && people.length === 0 && <NoPeopleMessage />}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
