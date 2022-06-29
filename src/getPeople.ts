export const getPeople = (url: string) => {
  return fetch(url)
    .then(response => {
      return response.json();
    });
};
