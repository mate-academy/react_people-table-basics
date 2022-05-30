import React, { useState, useCallback, useEffect } from 'react';

import { PeopleTable } from '../PeopleTabel/PeopleTable';

import { getPeople } from '../../api/getPeople';

import { PeopleWithParents, People } from '../../types/People';

import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<PeopleWithParents[] | null>(null);

  const peopleRequest = useCallback(async () => {
    const peopleFromServer: People[] = await getPeople();
    const peopleWithParents: PeopleWithParents[] = peopleFromServer
      .map(child => {
        const copychild: PeopleWithParents = { ...child };

        const parent = peopleFromServer.find(person => {
          return child.fatherName === person.name
          || child.motherName === person.name;
        });

        if (parent) {
          if (parent.sex === 'm') {
            copychild.father = parent;
          } else {
            copychild.mother = parent;
          }
        }

        return copychild;
      });

    setPeople(peopleWithParents);
  }, []);

  useEffect(() => {
    peopleRequest();
  }, []);

  return (
    <div className="peoplePage">
      <h1 className="peoplePage__title">
        People table
      </h1>

      <PeopleTable people={people} />
    </div>
  );
};

export {};
