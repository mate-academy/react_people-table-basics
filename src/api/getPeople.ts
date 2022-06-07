import { Person, PersonFromServer } from '../types/Person';
import { request } from './api';

const getPreparedPeople = (people: Required<PersonFromServer>[]): Person[] => {
  return people.map(person => {
    const preparedPerson: Person & PersonFromServer = {
      ...person,
      father: person.fatherName,
      mother: person.motherName,
    };

    delete preparedPerson.fatherName;
    delete preparedPerson.motherName;

    return preparedPerson;
  });
};

export const getPeople = async () => {
  const response = await request('/people.json');
  const data: Required<PersonFromServer>[] = await response.json();

  return getPreparedPeople(data);
};
