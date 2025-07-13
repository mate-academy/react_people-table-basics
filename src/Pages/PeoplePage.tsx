import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    getPeople()
      .then(setPeopleData)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleList = peopleData.map(person => {
    const father =
      peopleData.find(male => male.name === person.fatherName) || null;
    const mother =
      peopleData.find(fem => fem.name === person.motherName) || null;

    return {
      ...person,
      father: father,
      mother: mother,
    };
  });

  const isError = hasError && !isLoading;
  const isEmpty = !peopleList?.length && !isLoading && !hasError;
  const isPeople = !!peopleList?.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isPeople && <PeopleTable peopleList={peopleList} />}
        </div>
      </div>
    </>
  );
};
