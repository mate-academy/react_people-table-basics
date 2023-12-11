import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTab } from '../components/PeopleTab';

export const PeoplePage = () => {
  const [loader, setLoader] = useState(false);
  const [errorMеssage, setErrorMеssage] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setLoader(true);

    getPeople()
      .then((serverPeople) => {
        setPeople(serverPeople);
      })
      .catch(() => {
        setErrorMеssage(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {loader && <Loader /> }
      {!loader && (
        errorMеssage
          ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )
          : <PeopleTab people={people} />
      )}
    </>
  );
};
