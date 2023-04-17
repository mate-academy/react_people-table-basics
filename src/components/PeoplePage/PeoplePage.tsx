import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/peopleTable';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const { personSlug = '' } = useParams();

  const dowloadPeople = async () => {
    setIsLoading(true);

    try {
      const getPeopleFromServer = await getPeople();

      const peopleArray = getPeopleFromServer.map((person) => {
        const personCopy = { ...person };

        const father = getPeopleFromServer.find((dad) => (
          dad.name === person.fatherName
        ));

        const mother = getPeopleFromServer.find((mom) => (
          mom.name === person.motherName
        ));

        if (father) {
          personCopy.father = father;
        }

        if (mother) {
          personCopy.mother = mother;
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
    dowloadPeople();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {people.length > 0 && !isLoading && !errorMessage
            && <PeopleTable people={people} selectedPerson={personSlug} />}

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
