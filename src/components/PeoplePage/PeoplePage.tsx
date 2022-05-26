import React, { useEffect, useState, useCallback } from 'react';
import { getPeopleFromServer } from '../../api/people';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PersonWithParents } from '../../types';
import './PeoplePage.scss';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<PersonWithParents[] | null>(null);

  const getPeople = useCallback(async () => {
    const peopleFromServer = await getPeopleFromServer();
    const withParents: PersonWithParents[] = peopleFromServer.map((child) => {
      const copyChild: PersonWithParents = { ...child };

      const parent = peopleFromServer.find((person) => {
        return (
          child.fatherName === person.name || child.fatherName === person.name
        );
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

    setPeople(withParents);
  }, []);

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="PeoplePage">
      <h1 className="PeoplePage__title">People table</h1>

      <PeopleTable people={people} />
    </div>
  );
});
