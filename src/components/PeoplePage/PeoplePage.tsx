import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPeople } from '../../api/getPeople';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([{}]);

  useEffect(() => {
    getPeople()
      .then((response) => {
        setPeople(response);
      });
  }, []);

  return (
    <>
      <PeopleTable people={people} />
    </>
  );
};
