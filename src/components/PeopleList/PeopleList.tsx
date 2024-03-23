import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleItem } from '../PeopleItem/PeopleItem';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useParams } from 'react-router-dom';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  const fatchData = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const People = await getPeople();

      setPeople(People);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fatchData();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length === 0 && !isLoading && !isError && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !isError && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => (
                <PeopleItem
                  person={person}
                  key={person.slug}
                  people={people}
                  slug={slug}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
