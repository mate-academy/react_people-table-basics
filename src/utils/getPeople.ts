export const getPeople = () => {
  return fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  )
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    });
};
