// eslint-disable-next-line
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async() => {
  const response = await fetch(API_URL);
  const people = await response.json();
  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(
      mother => mother.name === person.motherName,
    ),
    father: people.find(
      father => father.name === person.fatherName,
    ),
  }));

  return preparedPeople;
};
