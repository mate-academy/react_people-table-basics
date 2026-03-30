/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { getPeople } from "../api";
import { Person } from "../types";
import { Loader } from "./Loader";
import { PeopleTable } from "./PeopleTable";

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && people.length > 0 && (
        <PeopleTable people={people} />
      )}
    </>
  );
};

