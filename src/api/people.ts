import axios from 'axios';
import { API_URL } from '../consts/consts';
import { Person } from '../types/Person';

type GetPeopleResponse = {
  data: Person[];
};

export const getPeople = async () => {
  try {
    const { data } = await axios.get<GetPeopleResponse>(
      API_URL,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return `${error.status}: ${error.message}`;
    }

    return 'An unexpected error occurred';
  }
};
