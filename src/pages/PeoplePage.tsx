/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { People } from '../types/People';

const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

export const PeoplePage: React.FC = () => {
  const [list, setList] = useState<People[]>([]);

  useEffect(() => {
    document.title = 'Peope page';

    async function getAll<T>(url: string): Promise<T[]> {
      const response = await fetch(BASE_URL + url);

      return response.json();
    }

    getAll<People>('/people.json')
      .then(people => setList(people));
  }, []);

  return (
    <>
      <div>This is people page</div>
      <PeopleTable people={list} caption="This is people table" />
    </>
  );
};
