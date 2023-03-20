import { Person } from "./types/Person"

  export const getPeopleWithParents = (people:Person[]): Person[] => {
    return people.map(person => {
    const mother = people.find(person => person.name === person.motherName)
    const father = people.find(person => person.name === person.fatherName)
    return {
      ...person,
      mother,
      father
    }
    })
  }
