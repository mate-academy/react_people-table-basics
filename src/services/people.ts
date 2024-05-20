import { Person } from '../types';

export function getPeoples(): Promise<Person[]> {
  return fetch('http://localhost:3000/api/people.json').then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
