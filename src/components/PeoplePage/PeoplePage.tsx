import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const getPeopleWithPerents = async () => {
    await getPeople()
      .then(result => setPeople(result.map((person: Person) => {
        return ({
          ...person,
          mother: result.find(mom => mom.name === person.motherName) || null,
          father: result.find(dad => dad.name === person.fatherName) || null,
        });
      })));
  };

  useEffect(() => {
    getPeopleWithPerents();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} />
    </div>
  );
};
