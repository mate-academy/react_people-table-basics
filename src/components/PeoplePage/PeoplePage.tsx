import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Outlet } from 'react-router-dom';

const getParent = (peopleList: Person[], name: string | null) => {
  return peopleList.find(person => person.name === name);
};

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(result => {
        setPeopleList(
          result.map(person => ({
            ...person,
            mother: getParent(result, person.motherName),
            father: getParent(result, person.fatherName),
          })),
        );
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

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
          {!peopleList.length && !isLoading && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {peopleList.length > 0 && <PeopleTable peopleList={peopleList} />}
        </div>
      </div>
      <Outlet />
    </>
  );
};
