import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Sidebar } from '../Sidebar/Sidebar';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const addParentsToPeople = (people: Person[]) => {
    const peopleWithParents = people.map(person => {
      person.mother = people.find(woman => woman.name === person.motherName) || null;
      person.father = people.find(man => man.name === person.fatherName) || null;

      return person;
    })

    return peopleWithParents;
  };

  useEffect(() => {
    const loadPeople = async () => {
      let people = await getPeople();
      setPeople(addParentsToPeople(people));
    }

    loadPeople()
  }, []);

  const selectPerson = (person: Person) => {
    setSelectedPerson(person);
  };

  return (
    <div className="media">
      <div className="media-container">
        {people
          ? <PeopleTable people={people} selectPerson={selectPerson} />
          : <Loader type="Rings" color="blue" />}
      </div>
      <div className="media-right">
        {selectedPerson
          ? <Sidebar
            selectedPerson={selectedPerson as Person}
            selectPerson={selectPerson}
            people={people as Person[]}
          />
          : <p>Choose the person</p>}
      </div>
    </div>
  );
};
