import { useEffect, useMemo, useState } from "react";
import { getPeople } from "../../api";
import { Loader } from "../../components/Loader";
import { PeopleList } from "../../components/PeopleList.tsx";
import { fillPersonParentsFields } from "../../helpers/fillPersonParentsFields";
import { Person } from "../../types";

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getPeopleFromServer = async () => {
    try {
      const response = await getPeople();
      const filledPeople = fillPersonParentsFields(response);
      setPeople(filledPeople);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const hasPeople = useMemo(() => Boolean(people.length), [people]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!hasPeople && !hasError && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {hasPeople && <PeopleList people={people} />}
        </div>
      </div>
    </div>
  );
};
