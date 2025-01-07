import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useEffect, useState } from 'react';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const peopleData = await getPeople();

        setPeople(peopleData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const dataPeople = people.map(person => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

    return {
      ...person,
      mother: mother,
      father: father,
    };
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isError && !isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && <PeopleTable people={dataPeople} />}
        </div>
      </div>
    </>
  );
};
