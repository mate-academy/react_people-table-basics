import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState(false);

  const callRequest = async () => {
    try {
      const peopleFromServer = await getPeople();
      const deepCopy = peopleFromServer.map(person => ({
        ...person,
        mother: peopleFromServer.find(
          mother => mother.name === person.motherName,
        ),
        father: peopleFromServer.find(
          father => father.name === person.fatherName,
        ),
      }));

      setPeopleList(deepCopy);
    } catch {
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    callRequest();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!errorMessage && !peopleList && <Loader />}

        {!errorMessage && peopleList && peopleList.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!errorMessage && peopleList && peopleList.length > 0 && (
          <PeopleTable peopleList={peopleList} />
        )}
      </div>
    </div>
  );
};
