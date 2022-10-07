import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeople } from '../../api';
import { Loader } from '../Loader';

import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

function preparePeopleList(people: Person[]) {
  people.forEach(person => {
    const child = person;

    child.mother = people.find(woman => woman.name === child.motherName);
    child.father = people.find(man => man.name === child.fatherName);
  });
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { slug: personSlug = '' } = useParams();

  useEffect(() => {
    const getPeopleFromServer = async () => {
      setIsLoading(true);
      try {
        const peopleFromServer = await getPeople();

        preparePeopleList(peopleFromServer);
        setPeople(peopleFromServer);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!error && people.length > 0 && (
                <PeopleTable people={people} personSlug={personSlug} />
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
};
