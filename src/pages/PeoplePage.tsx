import { useEffect, useState } from "react"
import { getPeople } from "../api";
import { Loader } from "../components/Loader";
import { PeopleTable } from "../components/PeopleTable";
import { Person } from "../types"

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const loadedPeople = await getPeople();

      const peopleWithParents = loadedPeople.map((person) => {
        const fountFather = loadedPeople.find(
          (father) => father.name === person.fatherName,
        );

        const foundMother = loadedPeople.find(
          (mother) => mother.name === person.motherName,
        );

        return Object.assign(person, {
          father: fountFather,
          mother: foundMother,
        });
      });

      setPeople(peopleWithParents);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const hasNoPeople = !isLoading && !people.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError"
            className="has-text-danger">
              Something went wrong
            </p>
          )}

          {hasNoPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  )
}
