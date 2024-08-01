import { useEffect, useState } from "react";
import { Loader } from "../Loader";
import { PeopleTable } from "../PeopleTable/PeopleTable";
import { getPeople } from "../../api";
import { Person } from "../../types";

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((data) => {
        setPeople(data);
      })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!isLoading && !people?.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
