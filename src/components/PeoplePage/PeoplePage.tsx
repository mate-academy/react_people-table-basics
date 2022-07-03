import React, { useEffect, useState } from 'react';
// import './PeoplePage.scss';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const getAllPeople = () => {
    getPeople()
      .then(peopleFromServer => {
        const peopleWithParents = peopleFromServer.map(person => {
          return {
            ...person,
            mother: peopleFromServer
              .find(woman => woman.name === person.motherName),
            father: peopleFromServer
              .find(man => man.name === person.fatherName),
          };
        });

        setPeople(peopleWithParents);
      });
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  return (
    <div className="table-item">
      <h2 className="title is-2 secondary-title">People page</h2>
      <PeopleTable people={people} />
    </div>
  );
};
