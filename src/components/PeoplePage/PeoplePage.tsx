import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { slug = '' } = useParams();

  const loadPeople = async () => {
    setIsLoading(true);
    try {
      const peopleFromServer = await getPeople();

      const peopleArray = peopleFromServer.map((person) => {
        const personCopy = { ...person };
        const mother = peopleFromServer.find((mom) => (
          mom.name === person.motherName
        ));

        const father = peopleFromServer.find((dad) => (
          dad.name === person.fatherName
        ));

        if (mother) {
          personCopy.mother = mother;
        }

        if (father) {
          personCopy.father = father;
        }

        return personCopy;
      });

      setPeople(peopleArray);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {people.length > 0 && !isLoading && !errorMessage
            && <PeopleTable people={people} selectedPerson={slug} />}

          {people.length === 0 && !isLoading && !errorMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {errorMessage
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
        </div>
      </div>
    </div>
  );
};
