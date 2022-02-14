export const getPeopleFromServer = async () => {
  const peopleFromServer = await fetch('https://mate-academy.github.io/react_people-table/api/people.json');

  return peopleFromServer.json();
};
