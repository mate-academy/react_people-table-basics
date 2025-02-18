import React, { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { Person } from "../types";
import { getPeople } from "../api";
import { Persons } from "../components/Persons";

export const People: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [peoples, setPeoples] = useState<Person[]>([]);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getPeople()
      .then(fetchedPeoples =>
        fetchedPeoples.map(people => ({
          ...people,
          mother: fetchedPeoples.find(
            mother => mother.name === people.motherName,
          ),

          father: fetchedPeoples.find(
            father => father.name === people.fatherName,
          ),
        })),
      )
      .then(setPeoples)
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

          {!peoples.length && !isError && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!peoples.length && <Persons peoples={peoples} />}
        </div>
      </div>
    </>
  );
};
