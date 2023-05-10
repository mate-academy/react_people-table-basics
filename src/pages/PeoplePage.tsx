import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeaopleTable } from '../components/PeopleTable/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isInPorcess, setIsInProcess] = useState<boolean>(false);

  const visiblePeople = useMemo(() => {
    const result: Person[] = [];

    people.forEach(person => {
      const { fatherName, motherName } = person;

      const father = fatherName
        ? people.find(p => p.name === fatherName)
        : undefined;

      const mother = motherName
        ? people.find(p => p.name === motherName)
        : undefined;

      result.push({
        ...person,
        father,
        mother,
      });
    });

    return result;
  }, [people]);

  useEffect(() => {
    setIsInProcess(true);

    const fetchPerson = async () => {
      try {
        const fetchedPerson = await getPeople();

        setPeople(fetchedPerson);
      } catch (innerError) {
        setError(true);
      } finally {
        setIsInProcess(false);
      }
    };

    setError(false);
    fetchPerson();
  }, []);

  const { slug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {error
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

          {(visiblePeople.length === 0 && !isInPorcess)
            && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

          {isInPorcess
            ? <Loader />
            : (
              <PeaopleTable
                people={visiblePeople}
                link={slug}
              />
            )}
        </div>
      </div>
    </>
  );
};
