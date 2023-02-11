import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const { personSlug = '' } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isReceiving, setIsReceiving] = useState<boolean>(false);
  const [isReceivedData, setIsReceivedData] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsReceiving(true);
    getPeople()
      .then(receivedPeople => {
        setPeople(receivedPeople);
        setIsReceivedData(true);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsReceiving(false);
      });
  }, []);

  const peopleReceived = isReceivedData && people.length;
  const emptyPeoplyList = isReceivedData && !people.length;

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">

        {isReceiving && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {emptyPeoplyList && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {peopleReceived && (
          <PeopleTable
            people={people}
            personSlug={personSlug}
          />
        )}
      </div>
    </div>
  );
};
