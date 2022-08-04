const BASE_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

type Options = {
  method: 'GET',
};

export const request = (options: Options) => {
  return fetch(BASE_URL, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - Not found`);
      }

      return res.json();
    });
};
