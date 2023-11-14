import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Table } from '../Table/Table';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { NoPeople } from '../NoPeople/NoPeople';
import { PeopleError } from '../PeopleError/PeopleError';
/* eslint-disable max-len */
export const PeoplePage = () => {
  const [loader, setLoader] = useState(true);
  const [people, setPeople] = useState<Person[]>();
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(serverPeople => {
        setPeople(serverPeople);
        setError(false);
      })
      .catch(() => setError(true)).finally(() => setLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader && (<Loader />)}
          {people?.length === 0 && (<NoPeople />)}
          {error && (<PeopleError />)}
          {error === false && people?.length && !loader && (<Table people={people} />)}
        </div>
      </div>

    </>
  );
};
