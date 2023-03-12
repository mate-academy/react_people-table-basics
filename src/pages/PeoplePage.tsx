import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';

import { PeopleTable } from '../components/Loader/PeopleTable';

import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(list => {
        setPeopleList(list);
        setIsLoading(true);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const { slug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable
        peoples={peopleList}
        nickName={slug}
        loading={isLoading}
        error={isError}
      />
    </>
  );
};
