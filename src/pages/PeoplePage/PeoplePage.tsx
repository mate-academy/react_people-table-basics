import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { ErrorMesseage } from '../../components/ErrorMessege';
import { Loader } from '../../components/Loader';
import { NoPeopleMessege } from '../../components/NoPeopleMessege';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const loadedPeople = async () => {
      try {
        const data = await getPeople();

        const visiblePeople = data.map(person => ({
          ...person,
          mother: data.find(mother => mother.name === person.motherName),
          father: data.find(father => father.name === person.fatherName),
        }));

        setPeople(visiblePeople);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoaded(false);
      }
    };

    loadedPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoaded && <Loader />}

          {isError && <ErrorMesseage />}

          {!isError && !isLoaded && !people.length && <NoPeopleMessege />}

          {!isLoaded && !isError && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
