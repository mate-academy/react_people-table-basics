import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage = () => {
  const [
    peopleFromServer,
    setPeopleFromServer,
  ] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isDataSuccessfulyFetched = !isLoading
    && !errorMessage && peopleFromServer;

  const preparePeopleData = (people: Person[]) => {
    const preparedPeople = people.map(person => {
      let mother;
      let father;

      if (person.motherName) {
        mother = people.find(({ name }) => person.motherName === name);
      }

      if (person.fatherName) {
        father = people.find(({ name }) => person.fatherName === name);
      }

      return { ...person, mother, father };
    });

    setPeopleFromServer(preparedPeople);
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(preparePeopleData)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {
            isLoading && (
              <Loader />
            )
          }

          {
            errorMessage && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errorMessage}
              </p>
            )
          }

          {
            isDataSuccessfulyFetched && (
              peopleFromServer.length ? (
                <PeopleTable people={peopleFromServer} />
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )
            )
          }
        </div>
      </div>
    </>
  );
};
