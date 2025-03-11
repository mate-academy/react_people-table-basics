import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types';

export const People = () => {
  const [peopleList, setPeopleList] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorFlag, setErrorFlag] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(response => {
        const updatedPeopleList = response.map(per => {
          return {
            ...per,
            mother: response.find(p => p.name === per.motherName) || undefined,
            father: response.find(p => p.name === per.fatherName) || undefined,
          };
        });

        setPeopleList(updatedPeopleList);
      })
      .catch(() => setErrorFlag(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : errorFlag ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : peopleList && peopleList.length > 0 ? (
            <PeopleTable peopleList={peopleList} />
          ) : (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
