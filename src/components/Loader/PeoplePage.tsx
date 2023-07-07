import { useEffect, useState } from 'react';

import { getPeople } from '../../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types/Person';

const preparePeopleArray = (people: Person[]) => {
  return people?.reduce((newPeopleArray: Person[], currentPerson) => {
    const mother = people?.find(
      (person) => person.name === currentPerson.motherName,
    );
    const father = people?.find(
      (person) => person.name === currentPerson.fatherName,
    );

    return [...newPeopleArray, { ...currentPerson, mother, father }];
  }, []);
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      try {
        const response = await getPeople();

        return preparePeopleArray(response);
      } catch {
        setErrorMsg('Unable to load people');

        return null;
      }
    };

    fetchPeople()
      .then(setPeople)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMsg && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMsg}
            </p>
          )}

          {!errorMsg && !loading && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
