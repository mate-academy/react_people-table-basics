import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => {
        const peopleServer: Person[] = response.map(person => {
          const mother = response
            .find(item => item.name === person.motherName);
          const father = response
            .find(item => item.name === person.fatherName);

          return ({
            ...person,
            mother,
            father,
          });
        });

        return peopleServer;
      })
      .then(preparedPeople => setPeople(preparedPeople))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && (
        <Loader />
      )}
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {people.length === 0 && !error && !isLoading && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
      {people.length > 0 && (
        <PeopleTable people={people} slugSelected={slug} />
      )}
    </>
  );
};
