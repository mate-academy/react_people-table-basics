import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTablet/PeopleTable';
import { SomethingWhentWrong } from '../components/SomethingWentWrong';
import { Person } from '../types';
import { getPeople } from '../api';
import { getFoolPeoplesInfo } from '../helpers/getFoolPeoplesInfo';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => setPeoples(
        getFoolPeoplesInfo(peopleFromServer),
      ))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {error ? (
                <SomethingWhentWrong />
              ) : (
                <PeopleTable peoples={peoples} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
