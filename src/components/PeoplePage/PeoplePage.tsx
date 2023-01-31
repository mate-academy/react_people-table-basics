import React, { memo, useEffect, useMemo, useState } from "react";
import { FC } from "react";
import { getPeople } from "../../api";
import { Person } from "../../types";
import { Loader } from "../Loader";
import { PeopleTable } from "../PeopleTable/PeopleTable";

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadPeople = async () => {
    try {
      setIsLoading(true);
      const loadedPeople = await getPeople();
      setPeople(loadedPeople);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const isDataLoaded = useMemo(() => (
    !isLoading && !isError && people.length
  ), [isError, isLoading, people])

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

          {isDataLoaded
            ? <PeopleTable people={people}/>
            : (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
          }
        </div>
      </div>
    </>
  );
});
