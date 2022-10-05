import { useEffect, useState } from "react";
import { getPeople } from "../api";
import { NoPeopleMessage, PeopleLoadingError } from "../components/ErrorMessage";
import { Loader } from "../components/Loader";
import { PeopleTable } from "../components/Loader/PeopleTable";
import { Person } from "../types";

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const downloadPeople = async () => {
    try {
      setIsLoading(true);
      const data = await getPeople();

      setPeople(data);
    } catch  {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    downloadPeople();
  }, [])

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isLoading && <Loader />}

        {error && <PeopleLoadingError/>}

        {people && people.length < 1 && <NoPeopleMessage />}

        {people && people.length > 0 && <PeopleTable people={people}/>}
      </div>
    </div>
  )
};
