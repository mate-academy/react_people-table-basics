import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isDataUploaded, setIsDataUploaded] = useState(false);
  const isUploadedDataEmpty = !isError && isDataUploaded && people.length === 0;

  const getPeopleWithParents = (peopleFromServer: Person[]) => {
    const peopleWithParents = peopleFromServer.map(child => {
      const mother = peopleFromServer
        .find(person => person.name === child.motherName);
      const father = peopleFromServer
        .find(person => person.name === child.fatherName);

      return { ...child, father, mother };
    });

    return peopleWithParents;
  };

  useEffect(() => {
    const dataFromServer = async () => {
      try {
        const uploadedPeople = await getPeople();
        const peopleWithParents = getPeopleWithParents(uploadedPeople);

        setPeople(peopleWithParents);
      } catch {
        setIsError(true);
      } finally {
        setIsDataUploaded(true);
      }
    };

    dataFromServer();
  }, []);

  const { personSlug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!isDataUploaded && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isUploadedDataEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable
              people={people}
              selectedPerson={personSlug}
            />
          )}
        </div>
      </div>
    </>
  );
};
