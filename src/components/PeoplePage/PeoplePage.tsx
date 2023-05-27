import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: FC = () => {
  const [peopleList, getPeopleList] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);

  const fetchPeopleList = useCallback(async () => {
    setIsError(false);

    try {
      const peopleFromServer = await getPeople();

      const preparedPeopleList = peopleFromServer.map(person => {
        const { motherName, fatherName } = person;
        const mother = peopleFromServer.find(({ name }) => name === motherName);
        const father = peopleFromServer.find(({ name }) => name === fatherName);

        return { ...person, mother, father };
      });

      getPeopleList(preparedPeopleList);
    } catch {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    fetchPeopleList();
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isError ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : (
          <PeopleTable people={peopleList} />
        )}
      </div>
    </div>
  );
};
