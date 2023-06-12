import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const peopleData = await getPeople();

        const peopleWithParents = peopleData.map(person => ({
          ...person,
          mother: peopleData.find(
            ({ name }) => name === person.motherName,
          ),
          father: peopleData.find(
            ({ name }) => name === person.fatherName,
          ),
        }));

        setPeople(peopleWithParents);
      } catch {
        setError(true);
      }

      setIsLoading(false);
    };

    fetchPeople();
  }, []);

  const { selectedSlug } = useParams<{ selectedSlug?: string }>();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : <PeopleTable people={people} selectedSlug={selectedSlug} />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && isLoading === false && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

        </div>
      </div>
    </>
  );
};
