import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { preparePeople } from '../../helpers';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { slug = '' } = useParams();

  const fetchPeople = async () => {
    try {
      let data = await getPeople();

      data = preparePeople(data);
      setPeople(data);
      setIsLoading(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isPeopleExist = useMemo(() => {
    return people.length === 0 && !isLoading;
  }, [people]);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {hasError && (
        <p
          data-cy="peopleLoadingError"
          className="has-text-danger"
        >
          Something went wrong
        </p>
      )}

      {people.length > 0 && (
        <PeopleTable
          people={people}
          selectedSlug={slug}
        />
      )}

      {isPeopleExist && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
    </>
  );
};
