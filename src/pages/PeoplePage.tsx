import { useEffect, useState } from "react"
import { Person } from "../types";
import { getPeople } from "../api";
import { Loader } from "../components/Loader";
import { PeopleTable } from "../components/PeopleTable";

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setIsLoading(true);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);


  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error &&
            (<p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>)
          }

          {!isLoading && !error &&
            (people.length === 0
              ? (<p data-cy="noPeopleMessage">There are no people on the server</p>)
              : (<PeopleTable people={people} />)
            )
          }
        </div>
      </div>
    </>
  );
};
