import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
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
        </div>
      </div>
    </div>
  );
};
