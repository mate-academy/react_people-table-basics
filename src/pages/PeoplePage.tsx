import React from 'react';
import { useEffect, useState } from 'react';
import { PeopleList } from '../components/PeopleList/PeopleList';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

export const PeoplePage: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasPeople = peopleList.length > 0;

  const displayedPeople = async () => {
    try {
      setIsLoading(true);
      const receivingData = await getPeople();

      setPeopleList(receivingData);
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    displayedPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {!!errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          {!isLoading && !errorMessage && !hasPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {hasPeople && <PeopleList peopleList={peopleList} />}
        </div>
      </div>
    </>
  );
};
