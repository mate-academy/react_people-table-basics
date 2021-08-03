import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setLoadingStatus] = useState(false);

  useEffect(() => {
    setLoadingStatus(true);
    const loadPeople = async() => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setLoadingStatus(false);
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1>People page</h1>
      {isLoading ? <Loader /> : <PeopleTable people={people} />}
    </>
  );
};
