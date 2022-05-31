import { getPeople } from './API/api';

export const preparedPeople = async (): Promise<Person[]> => {
  const peopleFromServer = await getPeople();

  peopleFromServer.map((person: Person) => {
    const newPerson = { ...person };

    newPerson.motherName = peopleFromServer
      .find((p: Person) => p.name === newPerson.motherName)
      || newPerson.motherName;

    newPerson.fatherName = peopleFromServer
      .find((p: Person) => p.name === newPerson.fatherName)
      || newPerson.fatherName;

    return newPerson;
  });

  return peopleFromServer;
};
