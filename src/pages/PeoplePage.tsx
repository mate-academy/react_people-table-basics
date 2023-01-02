import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getPeopleFromServer = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();
      const fullPeople = peopleFromServer.map(person => {
        const mother = peopleFromServer.find(
          ({ name }) => name === person.motherName,
        );
        const father = peopleFromServer.find(
          ({ name }) => name === person.fatherName,
        );

        return { ...person, mother, father };
      });

      setPeople(fullPeople);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const { slug = '' } = useParams();
  const noPeople = !people.length && !isLoading;
  const shouldRenderTable = !noPeople && !isError && !isLoading;

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {noPeople && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {shouldRenderTable
          && <PeopleTable people={people} selectedPerson={slug} />}
      </div>
    </div>
  );
};
