import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader/Loader';
import { Person } from '../../src/types/Person';
import { getPeople } from '../../src/api';
import { EmptyPeopleList } from '../components/EmptyPeopleList';
import { ErrorMessage } from '../components/ErrorMessage';
import { PeopleList } from '../components/PeopleList';
import { findPersonByName } from './PeopleList';


const peopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = findPersonByName({ people, name:person.motherName });

    const father = findPersonByName({ people, name:person.fatherName });

    return { ...person, mother, father };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then((peopleList) => setPeople(peopleWithParents(peopleList)))
      .catch(() => setError(true))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}
          {error && (
            <ErrorMessage />
          )}
          {(!loader && people.length === 0) && (
            <EmptyPeopleList />
          )}
          {(people.length !== 0 && !loader && !error) && (
            <PeopleList people={people} />
          )}
        </div>
      </div>
    </>
  );
};
