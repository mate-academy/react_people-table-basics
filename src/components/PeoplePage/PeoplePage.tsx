import React, { useCallback, useEffect, useState } from 'react';

import { getPeople } from '../../api/api';

import { People, PeopleParents } from '../../types/types';
import { PeopleTable } from '../PeopleTable';

import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [peoples, setPeoples] = useState<PeopleParents[] | null>(null);

  const getData = useCallback(async () => {
    const peopleServer: People[] = await getPeople();
    const withParents: PeopleParents[] = peopleServer.map(child => {
      const childCopy: PeopleParents = { ...child };

      const parent = peopleServer.find(person => {
        return child.fatherName === person.name
          || child.fatherName === person.name;
      });

      if (parent) {
        if (parent.sex === 'm') {
          childCopy.father = parent;
        } else {
          childCopy.mother = parent;
        }
      }

      return childCopy;
    });

    setPeoples(withParents);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1 className="people__title">
        People table
      </h1>

      <PeopleTable peoples={peoples} />
    </div>
  );
};
