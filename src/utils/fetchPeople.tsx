export function fetchPeople(url: string) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('People can not be loaded');
      }

      return response.json();
    });
}
