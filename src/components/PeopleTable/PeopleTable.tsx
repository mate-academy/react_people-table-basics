import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeopleTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [peopleArray, setPeopleArray] = useState<Person[]>([]);
  const { slug } = useParams();

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const loadedPeopleArray = await getPeople();

      setPeopleArray(loadedPeopleArray.map(person => ({
        ...person,
        mother: loadedPeopleArray.find(parent => (
          parent.name === person.motherName)
          ),
        father: loadedPeopleArray.find(parent => (
          parent.name === person.fatherName)
          ),
      })))
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1><div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleArray.length < 1 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

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
              {peopleArray.map(person => (
                <PersonLink
                  key={person.slug}
                  person={person}
                  slug={slug}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
