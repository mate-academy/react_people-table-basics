import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug: selectedSlug } = useParams();

  useEffect(() => {
    getPeople()
      .then((serverPeople: Person[]) => {
        const relatives = serverPeople.map(person => {
          const fullPerson = { ...person };
          const { fatherName, motherName } = fullPerson;

          if (fatherName) {
            fullPerson.father = serverPeople.find(
              person1 => person1.name === fatherName,
            );
          }

          if (motherName) {
            fullPerson.mother = serverPeople.find(
              person2 => person2.name === motherName,
            );
          }

          return fullPerson;
        });

        setPeople(relatives);
      })
      .catch(error => {
        setIsError(true);
        /* eslint-disable no-console */
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const hasNoPeople = !isError && !isLoading && people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {hasNoPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {people.length > 0 && (
            <PeopleTable people={people} selectedSlug={selectedSlug} />
          )}
        </div>
      </div>
    </>
  );
};
