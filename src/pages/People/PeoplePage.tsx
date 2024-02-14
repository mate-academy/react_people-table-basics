import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorOnLoad, setErrorOnLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { slug = '' } = useParams();

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setErrorOnLoad(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorOnLoad && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!people.length && !errorOnLoad && !isLoading)
            ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            ) : <PeopleTable people={people} selectedPersonSlug={slug} />}
        </div>
      </div>

    </>

  );
};
