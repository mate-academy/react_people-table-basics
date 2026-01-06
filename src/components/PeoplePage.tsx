import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { Person } from "../types";
import { getPeople } from "../api";
import { PeopleTable } from "./PeopleTable";

export const PeoplePage = () => {
  const [people, SetPeople] = useState<Person[]>([]);
  const [error, SetError] = useState<string | null>(null);
  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    const LoadPeople = async () => {
      SetLoading(true);

      try {
        const data = await getPeople();
        SetPeople(data);
      } catch (err) {
        SetError('Something went wrong');
      } finally {
        SetLoading(false);
      }
    };

    LoadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!error && !loading && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};