import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList/PeopleList';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsloading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Unable to load people list'))
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  function getPersonMother(motherName: string | null) {
    return people.find(person => person.name === motherName);
  }

  function getPersonFather(fatherName: string | null) {
    return people.find(person => person.name === fatherName);
  }

  const allPeople = people.map(person => ({
    ...person,
    mother: getPersonMother(person.motherName),
    father: getPersonFather(person.fatherName),
  }));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!errorMessage && !!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !errorMessage && <PeopleList people={allPeople} />}
        </div>
      </div>
    </>
  );
};
