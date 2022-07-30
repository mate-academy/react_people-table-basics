import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable';

export const PeopleList: React.FC = () => {
  const [peopleList, setpeopleList] = useState<People[]>([]);

  async function loader() {
    const usersFromServer = await getPeople();

    if (Array.isArray(usersFromServer)) {
      const resultPeopleList = usersFromServer.map((people, _, peoplesList) => {
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

      setpeopleList(resultPeopleList);
    }
  }

  useEffect(() => {
    loader();
  }, []);

  return (

    <div className="container">
      <PeopleTable peoples={peopleList} />
    </div>
  );
};
