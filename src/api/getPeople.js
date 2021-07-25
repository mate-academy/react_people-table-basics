export const getPeople = async () => {
  const result = await fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(response => response.json())
    .then(response => response.map((people) => {
      return {
        ...people,
        mother: response.find(obj => obj.name === people.motherName),
        father: response.find(obj => obj.name === people.fatherName),
      };
    }));

  return result;
};
