import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/people';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person []>([]);
  const [loader, setLoader] = useState(false);

  const peopleWithParents = (people: Person[]) => {
    return people.map(person => ({
      ...person,
      father: people.find(father => father.name === person.fatherName) || null,
      mother: people.find(mother => mother.name === person.motherName) || null,
    }));
  }

  useEffect(() => {
    (async function getData() {
      try {
        const response = (await getPeople()).json();

        setPeople(peopleWithParents(await response));
        setLoader(true);
      } catch {
        setPeople([]);
        setLoader(true);
      }
    })()
  }, []);

  return (
    <>
      {loader
        ? people.length ? <PeopleTable people={people}/> : <h1 className="title">Can`t upload people</h1>
        : <Loader />
      }
    </>
  );
}
