import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/helper';

import { Person } from '../../interfaces/Person';
import PeopleTable from '../PeopleTable/PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then((people) => {
      const peopleWithParents = people.map((person: Person) => {
        person.mother = person.motherName;
        person.father = person.fatherName;
        return person;
      });
      setPeople(peopleWithParents);
    });
  }, []);

  return (
    <div className="peoplePage">
      <PeopleTable people={people} />
    </div>
  );
};

export default PeoplePage;
