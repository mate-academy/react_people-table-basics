import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { PeopleContext } from '../context/PeopleContext';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setLoader(true);
    const loadPeople = async () => {
      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch {
        setErrorMessage('Something went wrong');
      } finally {
        setLoader(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <PeopleContext.Provider value={{ people }}>
        <h1 className="title">People Page</h1>
        <div className="container">
          <div className="block">
            <div className="box table-container">
              {loader ? (
                <Loader />
              ) : people.length > 0 ? (
                <PeopleTable />
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </PeopleContext.Provider>
    </>
  );
};
