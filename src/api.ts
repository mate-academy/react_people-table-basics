const API_BASE
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getPeople = async (): Promise<Person[]> => {
  const response = await fetch(API_BASE);

  return response.json();
};

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
