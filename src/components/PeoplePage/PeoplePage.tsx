import { useEffect, useState } from "react";
import { getPeople } from "../../api";
import { Person } from "../../types";
import { PeopleTitlePage } from "../PeopleTitlePage";
import { Loader } from "../Loader";
import { PeopleTable } from "../PeopleTable";
import { useParams } from "react-router-dom";

export const PeoplePage = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();
  const [isError, setIsError] = useState(false);

  const getPeopleFromServer = async () => {
    setIsLoader(true)
    try {
      const peopleFromServer = await getPeople();
      setPeople(peopleFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  }


  useEffect(() => {
  getPeopleFromServer();
  }, []);

  if (isError && !people.length) {
    console.log(people)
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <div className="block">
      <PeopleTitlePage />
      <div className="box table-container">
        {isLoader
          ? (
            <Loader />
          )
          : (
            <PeopleTable slug={slug} people={people} />
          )}
      </div>
    </div>
  );
};

