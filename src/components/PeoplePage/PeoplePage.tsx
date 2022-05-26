import {
  FC, useCallback, useEffect, useState,
} from 'react';
import { Oval } from 'react-loader-spinner';
import { getPeople } from '../../api/api';
import { PersonWithParents } from '../../types/Person';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<PersonWithParents[]>([]);

  const getPeopleFromServer = useCallback(async () => {
    const peopleFromServer = await getPeople();

    const peopleWithParents = peopleFromServer.map(person => {
      const copyPerson: PersonWithParents = { ...person };

      copyPerson.father = peopleFromServer.find(
        parent => parent.name === person.fatherName,
      );

      copyPerson.mother = peopleFromServer.find(
        parent => parent.name === person.motherName,
      );

      return copyPerson;
    });

    setPeople(peopleWithParents);
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <div>
      <h1 className="page-title">Peope page</h1>
      {people ? <PeopleTable people={people} /> : <Oval />}
    </div>
  );
};
