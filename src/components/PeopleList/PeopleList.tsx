import {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeopleList: FunctionComponent = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { slug = '' } = useParams();

  const getPeopleFromServer = useCallback(async () => {
    try {
      setIsLoading(true);

      const persons = await getPeople();

      setPeople(persons);
    } catch {
      setIsLoading(false);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    !hasError
      ? (
        <div className="block">
          <div className="box table-container">
            {isLoading
              ? (<Loader />)
              : (<PeopleTable people={people} slug={slug} />)}
          </div>
        </div>
      ) : (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )
  );
};
