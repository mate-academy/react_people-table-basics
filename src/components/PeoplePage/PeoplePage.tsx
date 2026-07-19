import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        const peopleWithParents = data.map(person => ({
          ...person,
          mother: data.find(
            currentPerson => currentPerson.name === person.motherName,
          ),
          father: data.find(
            currentPerson => currentPerson.name === person.fatherName,
          ),
        }));

        setPeople(peopleWithParents);
        setIsLoading(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
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

          {people.length === 0 && !isLoading && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {people.length > 0 && <PeopleTable people={people} slug={slug} />}
        </div>
      </div>
    </>
  );
};
