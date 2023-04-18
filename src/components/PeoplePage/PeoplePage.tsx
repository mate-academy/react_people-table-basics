import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();

  const fullPeopleData = (peopleArray: Person[]) => {
    return peopleArray.map((person) => {
      const mother = peopleArray.find(
        (human) => human.name === person.motherName,
      );
      const father = peopleArray.find(
        (human) => human.name === person.fatherName,
      );

      return Object.assign(person, { mother, father });
    });
  };

  const getDataPeoples = async () => {
    try {
      const data = await getPeople();
      const newData = fullPeopleData(data);

      setPeopleData(newData);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getDataPeoples();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {(peopleData === null && !isError) && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(peopleData && !peopleData.length) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!peopleData?.length && (
            <PeopleTable
              peopleData={peopleData}
              selectedPerson={slug}
            />
          )}

        </div>
      </div>
    </>
  );
};
