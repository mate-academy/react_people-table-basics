import { PeopleTable } from '../components/PeopleTable';
import {Loader} from "../components/Loader";
import {useEffect, useState} from "react";
import {Person} from "../types";
import {getPeople} from "../api";
export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false))
  }, []);

  return <>
    <h1 className="title">People Page</h1>

    <div className="block">
      <div className="box table-container">
        {loading && (<Loader />)}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(!loading && people.length === 0) &&
          (<p data-cy="noPeopleMessage">
            There are no people on the server
          </p>)}

        {(!loading && !errorMessage && people.length) &&
          (<PeopleTable people={people} />)}
      </div>
    </div>
  </>
}
