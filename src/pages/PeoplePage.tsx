import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import PersonList from '../components/PersonList';

const PeoplePage: React.FC = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoad(true);
    getPeople()
      .then(response => {
        const newPeople = response.map(person => {
          const mother = response.find(mom => mom.name === person.motherName);
          const father = response.find(dad => dad.name === person.fatherName);

          return { ...person, mother, father };
        });

        setPeople(newPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoad(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoad && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isError && !isLoad && <PersonList people={people} />}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
