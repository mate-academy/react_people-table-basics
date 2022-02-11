import { URL } from '.';

export const getPeopleFromServer = async () => {
  const response = await fetch(URL);

  return response.json();
};
