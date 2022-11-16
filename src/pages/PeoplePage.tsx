import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/Loader/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const { slug = '' } = useParams();
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPeople(null);
    getPeople()
      .then((result) => setPeople(result))
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (people) {
      setPeople(people.map((person) => {
        return {
          ...person,
          mother: people.find((mother) => mother.name === person.motherName),
          father: people.find((father) => father.name === person.fatherName),
        };
      }));
    }
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!people ? <Loader /> : (
            <PeopleTable people={people} selectedSlug={slug} />
          )}

          {isLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(isLoaded && !people) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
