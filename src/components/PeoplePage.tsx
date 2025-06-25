import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setLoading(true);
        setError(false);

        const data: Person[] = await getPeople();

        const peopleWithRelations = data.map(person => ({
          ...person,
          mother: person.motherName
            ? data.find(p => p.name === person.motherName)
            : undefined,
          father: person.fatherName
            ? data.find(p => p.name === person.fatherName)
            : undefined,
        }));

        setPeople(peopleWithRelations);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load people:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !error && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={slug || null} />
          )}
        </div>
      </div>
    </>
  );
};
