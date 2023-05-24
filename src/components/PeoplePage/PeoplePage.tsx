import { FC, useEffect, useState } from "react";
import { Loader } from "../Loader";
import { Person } from "../../types/Person";
import { getPeople } from "../../api"
import { PeopleTable } from "../PeopleTable/PeopleTable";

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        const fullPeopleinfo = peopleFromServer.map((person) => {
          const personMother = peopleFromServer.find(
            (motherPerson) => motherPerson.name === person.motherName,
          );
          const personFather = peopleFromServer.find(
            (fatherPerson) => fatherPerson.name === person.fatherName,
          );

          return { ...person, mother:personMother, father: personFather };
        });

        setPeople(fullPeopleinfo);
      })
      .catch(() => {
        setError('Unable to load people');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  console.log(people);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && (
          <>
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {error}
            </p>
            {people.length === 0 && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
            <PeopleTable people = {people}/>
          </>
        )}
      </div>
    </div>
  );
};
