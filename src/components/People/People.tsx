import { useEffect, useState } from 'react';
import { PeopleType } from '../../Type/People';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { fetchPeople } from '../../Api/getPeople';

const peopleList = (peoples: PeopleType[]) => {
  const newPeople = peoples.map((person) => {
    const mother = peoples.find((p) => p.name === person.motherName);
    const father = peoples.find((p) => p.name === person.fatherName);

    return {
      ...person,
      mother: mother || null,
      father: father || null,
      motherName: person.motherName || '-',
      fatherName: person.fatherName || '-',
    };
  });

  return newPeople;
};

export const People = () => {
  const [people, setPeople] = useState<PeopleType[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getPeople = async () => {
    try {
      const data = await fetchPeople();

      setPeople(peopleList(data));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeople();
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

          {!isLoading && !isError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
