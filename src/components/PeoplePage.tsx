import { PeopleLists } from './PeopleLists';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [peoplesLists, setPeoplesLists] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);

    getPeople()
      .then(data => {
        setPeoplesLists(data);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <PeopleLists
          isLoading={isLoading}
          peoplesLists={peoplesLists}
          errorMessage={errorMessage}
        />
      </div>
    </>
  );
};

export default PeoplePage;
