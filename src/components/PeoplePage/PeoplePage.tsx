import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/people';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState([] as Person[]);
  const [loader, setLoader] = useState(false);

  const peopleWithParents = (people: Person[]) => {
    return people.map(person => ({
      ...person,
      father: people.find(father => father.name === person.fatherName) || null,
      mother: people.find(mother => mother.name === person.motherName) || null,
    }));
  }

  useEffect(() => {
    getPeople()
      .then(people => {
        setPeople(peopleWithParents(people));
        setLoader(true);
      })
  }, []);

  return (
    <>
      {loader
        ? <PeopleTable people={people}/>
        : <Loader />
      }
    </>
  );
}
