/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { People } from '../Types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage : React.FC = () => {
  const url
  = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const [people, setPeople] = useState<People[]>();

  useEffect(() => {
    async function getPeople() {
      fetch(url)
        .then(response => response.json())
        .then(data => setPeople(
          data.map((el : People) => {
            el.mother = data.find((e : People) => e.name === el.motherName);
            el.father = data.find((e : People) => e.name === el.fatherName);

            return el;
          }),
        ));
    }

    getPeople();
  }, []);

  return (
    <>
      <h1>People page</h1>
      <PeopleTable arr={people} />
    </>
  );
};
