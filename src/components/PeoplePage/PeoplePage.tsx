import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      try {
        const peopleData = await getPeople();

        const modifiedPeopleData = peopleData.map(person => ({
          ...person,
          mother: peopleData.find(p => p.name === person.motherName),
          father: peopleData.find(p => p.name === person.fatherName),
        }));

        setPeople(modifiedPeopleData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <>
      <main className="section">
        <div className="container">
          <br />
          <br />
          <h1 className="title">People Page</h1>
          <div className="block">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
