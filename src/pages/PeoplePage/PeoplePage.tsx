import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PersonTable } from '../../components/PersonTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getPeopleData = async () => {
      try {
        const peopleData = await getPeople();

        const modifiedPeopleData = peopleData.map(person => {
          const modifiedPerson = { ...person };
          const personMother = peopleData.find(
            p => p.name === person.motherName,
          );
          const personFather = peopleData.find(
            p => p.name === person.fatherName,
          );

          if (personMother) {
            modifiedPerson.mother = personMother;
          }

          if (personFather) {
            modifiedPerson.father = personFather;
          }

          return modifiedPerson;
        });

        setPeople(modifiedPeopleData);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    getPeopleData();
  }, []);

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

          {!isLoading && !people.length && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && <PersonTable people={people} />}
        </div>
      </div>
    </>
  );
};
