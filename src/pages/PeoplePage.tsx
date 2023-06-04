import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadError, setDownloadError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(res => setPeopleFromServer(res))
      .catch(() => setDownloadError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = (initialPeople: Person[]) => {
    const updatedPeople = initialPeople.map(person => {
      const updatedPerson = { ...person };
      const personFather
        = initialPeople.find(p => updatedPerson.fatherName === p.name);
      const personMother
        = initialPeople.find(p => updatedPerson.motherName === p.name);

      if (personFather) {
        updatedPerson.father = personFather;
      }

      if (personMother) {
        updatedPerson.mother = personMother;
      }

      return updatedPerson;
    });

    return updatedPeople;
  };

  const visiblePeople = peopleWithParents(peopleFromServer);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && visiblePeople.length === 0 && !downloadError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {downloadError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {
            !isLoading
            && !downloadError
            && visiblePeople.length > 0
            && <PeopleTable people={visiblePeople} />
          }
        </div>
      </div>
    </>
  );
};
