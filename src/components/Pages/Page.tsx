import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPeople } from "../../api";
import { Loader } from "../Loader";
import { PeopleTable } from "../PeopleTable/PeopleTable";
import { Person } from "../../types";

export const Page = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { personSlug = "" } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((result) => setPeople(result))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && !people.length && isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !people.length && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && people.length && !isError && (
            <PeopleTable people={people} personSlug={personSlug} />
          )}
        </div>
      </div>
    </>
  );
};
