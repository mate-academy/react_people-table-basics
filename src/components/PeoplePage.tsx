import React, { useEffect, useState } from 'react';
import { users } from '../api/users';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<UserFromServerType[]>([]);

  useEffect(() => {
    users().then(usersFromServer => {
      const newUsers = [...usersFromServer].map((userFromServer) => {
        const newUserFromServer = { ...userFromServer };
        const { fatherName, motherName } = userFromServer;

        const father = usersFromServer
          .find((person: UserFromServerType) => person.name === fatherName) || fatherName;

        const mother = usersFromServer
          .find((person: UserFromServerType) => person.name === motherName) || fatherName;

        newUserFromServer.father = father;
        newUserFromServer.mother = mother;

        return newUserFromServer;
      });

      return setPeopleFromServer(newUsers);
    });
  }, []);

  return (
    <>
      <h1>PeoplePage</h1>
      <PeopleTable peopleFromServer={peopleFromServer} />
    </>
  );
};
