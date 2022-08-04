import { request } from './api';

export const getPeople = () => {
  return request({ method: 'GET' });
};
