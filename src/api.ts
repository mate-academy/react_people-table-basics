const Url = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async () => {
  const request = await fetch(Url);

  return request.json();
};
