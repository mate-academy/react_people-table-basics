import { useState, useEffect } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { getPersonWithParents } from '../../helpers/getPersonWithParents';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoadingData(true);
    getPeople()
      .then(peopleFromServer => (
        setPeople(getPersonWithParents(peopleFromServer))
      ))
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoadingData(false);
      });
  }, []);

  const isNoPeople = !isError && !isLoadingData && !people.length;
  const toShowPeople = !isError && !isLoadingData && people.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoadingData && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {toShowPeople && (
            <PeopleTable people={people} />
          )}

        </div>
      </div>
    </>
  );
};
