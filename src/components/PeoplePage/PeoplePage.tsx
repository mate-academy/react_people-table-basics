import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import './PeoplePage.scss';

export const PeoplePage: React.FC<{}> = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getPeople();
      setPeople(data);
    })()
  }, []);

  const preparedPeople = people
    .map((person: Person) => ({
      ...person,
      mother: people
        .find((woman: Person) => woman.name === person.motherName) || null,
      father: people
        .find((man: Person) => man.name === person.fatherName) || null,
    }));

  return (
    <div className="People">
      <h1>
        People page
      </h1>
      {preparedPeople.length > 0 && (
        <PeopleTable people={preparedPeople} />
      )}
    </div>
  );
}
