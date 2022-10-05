import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { ErrorNotification } from '../../components/ErrorNotification';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types/Person'

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPeopleLoaded, setIsPeopleLoaded] = useState(false);

  useEffect(() => {
    setIsPeopleLoaded(true);

    const getPeopleAsync = async () => {
      try {
        const receivedPeople = await getPeople();
        console.log('receivedPeople: ', receivedPeople);
        setPeople(receivedPeople);
        if (people.length) {
          setErrorMessage('There are no people on the server');
        }
      } catch {
        setErrorMessage('Something went wrong');
      } finally {
        setIsPeopleLoaded(false);
      }
    }
    getPeopleAsync();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoaded && <Loader />}
          {errorMessage && <ErrorNotification message={errorMessage} />}
          {!!people.length && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  )
};
