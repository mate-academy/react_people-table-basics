import React, { useState, useEffect } from 'react';
import PeopleTable from '../PeopleTable/PeopleTable';

const PeoplePage = () => {
  // eslint-disable-next-line max-len
  const url = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const [people, setPeople] = useState([]);

  const getPeople = async() => {
    const receivedPeople = await fetch(url).then(data => data.json());
    const updatedPeopleInfo = receivedPeople.map((person, index, persons) => ({
      ...person,
      father: persons.find(man => man.name === person.fatherName) || null,
      mother: persons.find(woman => woman.name === person.motherName) || null,
    }));

    setPeople(updatedPeopleInfo);
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <>
      <h1>People page</h1>
      <PeopleTable people={people} />
    </>
  );
};

export default PeoplePage;
