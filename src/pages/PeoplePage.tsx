import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [peoples, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    getPeople()
      .then((loadPeoples: Person[]) => {
        setPeople(loadPeoples);

        if (loadPeoples.length > 0) {
          setErrorMessage('');
        }
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}
          {!loader && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
          {!loader && peoples.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!loader && peoples.length > 0 && <PeopleTable peoples={peoples} />}
        </div>
      </div>
    </>
  );
};
