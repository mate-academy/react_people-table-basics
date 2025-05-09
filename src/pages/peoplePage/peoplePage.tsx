import React, { useContext, useEffect } from 'react';
import { PeopleTable } from '../../components/peopleTable/peopleTable';
import { PeopleContext } from '../../store/peopleContext/peopleContext';
import { NoPeople } from '../../components/noPeople/noPeople';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { Wrong } from '../../components/wrong/wrong';

export const PeoplePage: React.FC = () => {
  const { isLoading, setIsLoading, error, setError, people, setPeople } =
    useContext(PeopleContext);

  useEffect(() => {
    setError(false);
    setIsLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setError(false);
        setIsLoading(false);
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
  }, []);

  {
    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}
            {error && <Wrong />}
            {!isLoading &&
              !error &&
              (people.length > 0 ? <PeopleTable /> : <NoPeople />)}
          </div>
        </div>
      </>
    );
  }
};
