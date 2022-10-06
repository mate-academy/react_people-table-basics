import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setLoader] = useState(true);
  const [isError, setError] = useState(true);
  const [messageError, setMessageError] = useState('');
  const { slug = '' } = useParams();

  useEffect(() => {
    setError(true);
    getPeople()
      .then(response => {
        setPeople(response);
        setError(false);
        setMessageError('');
      })
      .catch(() => {
        setMessageError('Something went wrong');
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={people}
        selectedPerson={slug}
        isLoader={isLoader}
        messageError={messageError}
        isError={isError}
      />
    </>

  );
};
