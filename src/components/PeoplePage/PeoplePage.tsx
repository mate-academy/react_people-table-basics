import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
// import { PersonRow } from '../PersonRow';
import { PeopleTable } from '../PeopleTable';

const preparePeople = (peopleFromServer: Person[]): Person[] => {
  return peopleFromServer.map((person) => ({
    ...person,
    mother: peopleFromServer.find(mother => mother.name === person.motherName),
    father: peopleFromServer.find(father => father.name === person.fatherName),
  }));
};

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peopleData = await getPeople();

      setPeople(preparePeople(peopleData));
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const getBody = (
    loadingState: boolean,
    error: string,
    peopleArray: Person[],
  ) => {
    if (loadingState) {
      return <Loader />;
    }

    if (error && !loadingState) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      );
    }

    if (!peopleArray.length && !loadingState) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

    return (
      <PeopleTable people={peopleArray} />
    );
  };

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {getBody(isLoading, errorMessage, people)}
          {/* {isLoading && <Loader />}

          {errorMessage && !isLoading
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!people.length && !isLoading
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length && !isLoading
          && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <PersonRow person={person} key={person.slug} />
                ))}
              </tbody>
            </table>
          )} */}
        </div>
      </div>
    </div>
  );
};
