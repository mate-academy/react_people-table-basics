const peopleUrl = 'https://mate-academy.github.io/react_people-table/api/people.json';

export function request(url: string) {
  return fetch(url)
    .then(response => response.json());
}

export function getPeople() {
  return request(peopleUrl);
}
