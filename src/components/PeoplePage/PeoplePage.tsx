import { useEffect, useState } from 'react';
import { Tablet } from '../Tablet/Tablet';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  useEffect(() => {
    setIsLoader(true);
    getPeople()
      .then(res => setPeople(res))
      .catch(() => setIsError(true))
      .finally(() => setIsLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <Tablet people={people || []} isError={isError} isLoader={isLoader} />
    </>
  );
};
