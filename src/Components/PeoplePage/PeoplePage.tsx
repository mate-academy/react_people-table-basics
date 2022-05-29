import './PeoplePage.scss';
import React, { useCallback, useState, useEffect } from 'react';
import { getPeople } from '../../api/api';
import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isErr, setIsErr] = useState(false);

  const getPeopleFromServer = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();
      const peopleWithParents = peopleFromServer.map((child) => {
        const parent = peopleFromServer.find((person) => (
          person.name === child.fatherName
            || person.name === child.motherName
        ));
        const childWithParents = { ...child };

        if (parent && parent.sex === 'm') {
          childWithParents.father = parent;
        }

        if (parent && parent.sex === 'f') {
          childWithParents.mother = parent;
        }

        return childWithParents;
      });

      setPeople(peopleWithParents);
    } catch {
      setIsErr(true);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, [isErr]);

  return (
    <section className="people-page">
      <h2 className="people-page__title">
        People page
      </h2>
      {(!isErr) && <PeopleTable people={people} />}
      {isErr && 'Error data loading'}
    </section>
  );
};
