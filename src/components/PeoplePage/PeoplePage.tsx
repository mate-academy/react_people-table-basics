import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const getPersonWithParents = async () => {
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
    getPersonWithParents();
  }, []);

  return (
    <div className="people-container">
      <h2 className="title">People Page</h2>
      <PeopleTable people={people} />
    </div>
  );
};
