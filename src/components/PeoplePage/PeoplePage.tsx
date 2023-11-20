import { useEffect, useState } from 'react';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Person } from '../../types';
import { EmptyPeopleList } from '../EmptyPeopleList/EmptyPeopleList';
import { PeopleList, findPersonByName } from '../PeopleList/PeopleList';
import { Loader } from '../Loader';
import { getPeople } from '../../api';

const peopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = findPersonByName({ people, name: person.motherName });

    const father = findPersonByName({ people, name: person.fatherName });

    return { ...person, mother, father };
  });
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    getPeople()
      .then(peopleList => setPeople(peopleWithParents(peopleList)))
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoader(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoader && <Loader />}

          {errorMessage && <ErrorMessage />}

          {(!isLoader && people.length === 0) && (
            <EmptyPeopleList />
          )}

          {(people.length !== 0 && !isLoader && !errorMessage) && (
            <PeopleList people={people} />
          )}
        </div>
      </div>
    </>
  );
};
