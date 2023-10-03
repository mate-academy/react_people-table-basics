import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const peopleWithParents = people.map(person => {
    const mother = people.find(element => element.name === person.motherName);
    const father = people.find(element => element.name === person.fatherName);

    return { ...person, mother, father };
  });

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {people.length === 0 && !isLoading && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {people.length > 0
        && (
          <PeopleTable people={peopleWithParents} />)}
          </div>
        </div>
      </div>
    </main>
  );
};
