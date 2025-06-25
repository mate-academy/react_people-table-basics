import { FC, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setErrorMessage(false);
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (error) {
        setErrorMessage(true);
      } finally {
        setisLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : people.length > 0 ? (
            <PeopleTable people={people} />
          ) : (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
