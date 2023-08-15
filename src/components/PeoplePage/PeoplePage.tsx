import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [
    selectedPersonSlug,
    setSelectedPersonSlug,
  ] = useState<string>(slug || '');
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((fetchedPeople) => {
        setPeople(fetchedPeople.map(person => {
          const personCopy = { ...person };
          const mother = fetchedPeople.find(mom => (
            mom.name === person.motherName
          ));
          const father = fetchedPeople.find(dad => (
            dad.name === person.fatherName
          ));

          personCopy.mother = mother;
          personCopy.father = father;

          return personCopy;
        }));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isLoadedSuccessfully = !isError && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isError && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoadedSuccessfully && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoadedSuccessfully && people.length > 0 && (
            <PeopleTable
              people={people}
              selectedPersonSlug={selectedPersonSlug}
              setSelectedPersonSlug={setSelectedPersonSlug}
            />
          )}
        </div>
      </div>
    </>
  );
};
