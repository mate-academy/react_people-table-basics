import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

import { getPeople } from '../api';

import { Person } from '../types';

enum ErrorType {
  none,
  loadingError,
  noPeopleOnServer,
}

const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(motherToFind => {
      return motherToFind.name === person.motherName;
    });

    const father = people.find(fatherToFind => {
      return fatherToFind.name === person.fatherName;
    });

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.none);

  const { slug = '' } = useParams();

  const loadPeople = async () => {
    try {
      setIsLoading(true);

      const peopleFromServer = await getPeople();

      if (!peopleFromServer.length) {
        setErrorType(ErrorType.noPeopleOnServer);

        return;
      }

      const peopleWithParents = getPeopleWithParents(peopleFromServer);

      setPeople(peopleWithParents);
    } catch {
      setErrorType(ErrorType.loadingError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : (
              <>
                {errorType === ErrorType.loadingError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {errorType === ErrorType.noPeopleOnServer && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                <PeopleTable
                  people={people}
                  selectedPerson={slug}
                />
              </>
            )}
        </div>
      </div>
    </>
  );
};
