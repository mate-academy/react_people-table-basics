/* eslint-disable react/jsx-filename-extension */
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  const loadPeople = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(mother => mother.name === person.motherName),
    father: people.find(father => father.name === person.fatherName),
  }));

  return (
    <div>
      <h1 className="title">
        People Page
      </h1>
      <PeopleTable people={preparedPeople} />
    </div>
  );
};
