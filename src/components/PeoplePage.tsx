import React, { useEffect, useState } from 'react';

import { PeopleTable } from './PeopleTable';

import { getPeople } from '../api/api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then((res: Person[]) => res.map(person => ({
        ...person,
        father: res.find(m => m.name === person.fatherName),
        mother: res.find(f => f.name === person.motherName),
      })))
      .then(setPeople);
  }, []);

  return (
    <div className="NotFoundPag block">
      <h2 className="title HomePage__title">
        Peope page
      </h2>
      <PeopleTable people={people} />
    </div>
  );
};
