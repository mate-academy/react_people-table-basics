import { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { LoaderEnum } from '../types/loader';



export const People = () => {
  const [error, setError] = useState('');
  const [loader, setLoader] = useState<LoaderEnum>(
    LoaderEnum.initial
  );

  const [people, setPeople] = useState<Person[]>([]);  useEffect(() => {
    setLoader(LoaderEnum.loading);


    getPeople().then((data) => {setPeople(data)})
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoader(LoaderEnum.loaded);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} error={error} loader={loader} />
    </>
  );
};
