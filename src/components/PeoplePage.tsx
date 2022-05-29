import {
  FC, useCallback, useEffect, useState,
} from 'react';

import { preparedPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const getListOfPeople = useCallback(async () => {
    const listOfPeople = await preparedPeople();

    setPeople(listOfPeople);
  }, []);

  useEffect(() => {
    getListOfPeople();
  }, []);

  return (
    <>
      <h1>People page</h1>
      <PeopleTable people={people} />
    </>
  );
};
