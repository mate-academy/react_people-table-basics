const peopleUrl = 'https://mate-academy.github.io/'
  + 'react_people-table/api/people.json';

async function request(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export const getPeople = () => request(peopleUrl);
