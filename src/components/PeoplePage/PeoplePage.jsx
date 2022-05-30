import React, { useState, useEffect } from 'react';
import { PeopleTable } from '../PeopleTable/PeopleTable';

const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getPeople = async() => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`,
          );
        }

        const actualData = await response.json();

        setPeople(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPeople(null);
      } finally {
        setDataIsLoaded(true);
      }
    };

    getPeople();
  }, []);

  return (
    <>
      <h1 className="home_page">People page</h1>
      {dataIsLoaded ? <PeopleTable people={people} /> : <h1>{error}</h1>}
    </>
  );
};
