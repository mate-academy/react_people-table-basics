import { useEffect, useState } from "react";
import { Person } from "../../types";
import { getPeople } from "../../api";
import { Loader } from "../Loader";
import { PersonItem } from "./PersonItem";

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [peopleMessage, setPeopleMessage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((response) => {
        setPeople(response);

        if (response.length === 0) {
          setPeopleMessage(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
    <div className="box table-container">
      {isLoading && <Loader />}

      {error
        && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

      {peopleMessage
        && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

      {!isLoading
        && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people?.map((person, index) => {
                return (
                  <PersonItem
                    person={person}
                    people={people}
                    key={person.slug || index}
                  />
                );
              })}
            </tbody>
          </table>
        )}
    </div>
  </div>
);
};
