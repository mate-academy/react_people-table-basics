import { useEffect, useState } from 'react';
import { People } from '../components/People';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    getPeople()
      .then(data => {
        const normalizeData = data.map(person => {
          return {
            ...person,
            mother: data.find(
              findPerson => findPerson.name === person.motherName,
            ),
            father: data.find(
              findPerson => findPerson.name === person.fatherName,
            ),
          };
        });

        setPeople(normalizeData);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading &&
            !hasError &&
            (people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <People people={people} selectedSlug={slug} />
            ))}
        </div>
      </div>
    </>
  );
};
