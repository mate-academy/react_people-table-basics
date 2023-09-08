import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { slug } = useParams();

  function getParents(peopleFromServer: Person[]) {
    const peopleWithParents = peopleFromServer.map((person) => {
      const newPerson = { ...person };

      newPerson.father = peopleFromServer
        .find(father => father.name === newPerson.fatherName);

      newPerson.mother = peopleFromServer
        .find(mother => mother.name === newPerson.motherName);

      return newPerson;
    });

    return peopleWithParents;
  }

  useEffect(() => {
    setIsloading(true);
    getPeople()
      .then((peopleFromServer) => {
        setPeople(getParents(peopleFromServer));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsloading(false));
  }, []);

  const selectedPerson = people.find((person) => person.slug === slug);

  return (
    <div className="block">
      <div className="box table-container">
        <h1 className="title">People Page</h1>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isError ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : (
              <>
                {!people.length ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <PeopleTable
                    people={people}
                    selectedPerson={selectedPerson}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
