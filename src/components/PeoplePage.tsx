/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { request } from './api';
import { People } from '../Types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage : React.FC = () => {
  const [people, setPeople] = useState<People[]>();

  useEffect(() => {
    const getPeople = async () => {
      let result = await request();

      result = result.map(
        (el : People) => {
          el.mother = result.find((e : People) => e.name === el.motherName);
          el.father = result.find((e : People) => e.name === el.fatherName);

          return el;
        },
      );

      setPeople(result);
    };

    getPeople();
  }, []);

  return (
    <>
      <h1>People page</h1>
      <PeopleTable arr={people} />
    </>
  );
};
