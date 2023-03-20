const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export function getPeople(
  url = 'people.json',
  method: RequestMethod = 'GET',
): Promise<[]> {
  const options: RequestInit = { method };

  return wait(500)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => response.json());
}
