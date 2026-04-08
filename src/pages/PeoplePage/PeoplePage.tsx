import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        const procededData = data.map(person => ({
          ...person,
          mother: data.find(elem => elem.name === person.motherName),
          father: data.find(elem => elem.name === person.fatherName),
        }));

        setPersons(procededData);
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <main className="section">
        <div className="container">
          <h1 className="title">People Page</h1>
        </div>
      </main>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && persons.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !isError && persons.length > 0 && (
            <PeopleTable persons={persons} />
          )}
        </div>
      </div>
    </>
  );
};
