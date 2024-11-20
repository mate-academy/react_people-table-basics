import { PeopleTable } from "../components/PeopleTable";
import * as peopleFromServer from '../api';
import { useEffect, useState } from "react";
import { Person } from "../types/Person";
import { Loader } from "../components/Loader";



export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);


  useEffect(() => {
    setLoader(true)
    peopleFromServer.getPeople().then(setPeople)
      .catch(()=>setError(true))
    .finally(()=>setLoader(false))
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {loader ? (<Loader />) : (
      <PeopleTable peopleList={people}/>

       )}

      {error && <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
      }

      {
        people.length === 0 && !loader && !error &&
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      }
      </>
  )
}

