import React, { useCallback, useEffect, useState } from 'react';

import { getPeopleFromServer } from '../../api/people';

import { People, PeopleWithParents } from '../../types/people';
import { PeopleTable } from '../PeopleTable';

import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [peoples, setPeoples] = useState<PeopleWithParents[] | null>(null);

  const getPeople = useCallback(async () => {
    const peopleFromServer: People[] = await getPeopleFromServer();
    const withParents: PeopleWithParents[] = peopleFromServer.map(child => {
      const copyChild: PeopleWithParents = { ...child };

      const parent = peopleFromServer.find(person => {
        return child.fatherName === person.name
          || child.fatherName === person.name;
      });

      if (parent) {
        if (parent.sex === 'm') {
          copyChild.father = parent;
        } else {
          copyChild.mother = parent;
        }
      }

      return copyChild;
    });

    setPeoples(withParents);
  }, []);

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="PeoplePage">
      <h1 className="PeoplePage__title">
        People table
      </h1>

      <PeopleTable peoples={peoples} />
    </div>
  );
};
