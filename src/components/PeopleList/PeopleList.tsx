import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable';

export const PeopleList: React.FC = () => {
  const [peopleList, setPeopleList] = useState<People[]>([]);

  async function loader() {
    const peopleFromServer = await getPeople();

    if (Array.isArray(peopleFromServer)) {
      const resultPeopleList = peopleFromServer
        .map((people, _, peoplesList) => {
          const mother = peoplesList.find(person => (
            person.name === person.motherName
          ));
          const father = peoplesList.find(person => (
            person.name === people.fatherName
          ));

          return {
            ...people,
            mother: mother || null,
            father: father || null,
          };
        });

      setPeopleList(resultPeopleList);
    }
  }

  useEffect(() => {
    loader();
  }, []);

  return (

    <div className="container">
      <PeopleTable people={peopleList} />
    </div>
  );
};
