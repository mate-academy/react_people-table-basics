import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { ErrorNotification } from '../../components/ErrorNotification';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleContext } from '../../context';
import { Person } from '../../types/Person';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);

  useEffect(() => {
    setIsPeopleLoading(true);

    const getPeopleAsync = async () => {
      try {
        const receivedPeople = await getPeople();

        if (receivedPeople.length) {
          setPeople(receivedPeople);
        } else {
          setErrorMessage('There are no people on the server');
        }
      } catch {
        setErrorMessage('Something went wrong');
      } finally {
        setIsPeopleLoading(false);
      }
    };

    getPeopleAsync();
  }, []);

  return (
    <PeopleContext.Provider value={people}>
      <>
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isPeopleLoading && <Loader />}
            {errorMessage && <ErrorNotification message={errorMessage} />}
            {!!people.length && <PeopleTable />}
          </div>
        </div>
      </>
    </PeopleContext.Provider>
  );
};
