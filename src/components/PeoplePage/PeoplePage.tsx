import React, { useCallback, useState, useEffect } from 'react';
import { getPeople } from '../../Api/Api';
import { Person } from '../../react-app-env';
import { PeopleTable } from '../PeopleTable/PeopleTable';

enum Sex {
  male = 'm',
  female = 'f',
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const getPeopleFromServer = useCallback(async () => {
    const peopleFromServer = await getPeople();

    const peopleWithParents = peopleFromServer.map(child => {
      const findedParent = peopleFromServer.find((person) => {
        return (
          child.fatherName === person.name || child.fatherName === person.name
        );
      });

      const childWithParents = { ...child };

      if (findedParent) {
        if (findedParent && findedParent.sex === Sex.male) {
          childWithParents.father = findedParent;
        }

        if (findedParent && findedParent.sex === Sex.female) {
          childWithParents.mother = findedParent;
        }
      }

      return childWithParents;
    });

    setPeople(peopleWithParents);
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <div className="peoplePage">
      <h1 className="peoplePage__title">
        People table
      </h1>

      <div>
        <PeopleTable people={people} />
      </div>
    </div>
  );
};
