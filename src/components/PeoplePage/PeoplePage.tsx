import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import PeopleTable from '../PeopleTable/PeopleTable';
import './PeoplePage.scss';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(result => {
      setPeople(result);
    });
  }, []);

  const peopleWithParents = [...people];

  people.map((person, index, arr) => {
    peopleWithParents[index].father
    = arr.find(currentPerson => currentPerson.name === person.fatherName);

    peopleWithParents[index].mother
    = arr.find(currentPerson => currentPerson.name === person.motherName);

    return '';
  });

  return (
    <>
      <h2 className="PeoplePageTitle">
        People Page
      </h2>
      <ul className="Persons">
        <PeopleTable
          people={peopleWithParents}
        />
      </ul>
    </>
  );
};

export default PeoplePage;
