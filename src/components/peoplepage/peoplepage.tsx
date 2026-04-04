import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../peopletable/peopletable';


export const PeoplePage: React.FC = () => {
   const [person, setPerson] = useState<Person[]>([]);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [serveAlone, setServeAlone] = useState<boolean>(false);

  const getError = (message: string) => setErrorMessage(message);

   useEffect(() => {
      setErrorMessage('');
      setIsloading(true);
      getPeople()
        .then(people => {
          setPerson(people);
          setIsloading(false);
        })
        .catch(() => getError('Something went wrong'))
        .finally(() => setServeAlone(true));
    }, []);

    const { slug } = useParams();
    const selectedUser = slug;


  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable person={person} errorMessage={errorMessage} isLoading={isLoading} serveAlone={serveAlone} selectedUser={selectedUser } />

    </>
  );
};
