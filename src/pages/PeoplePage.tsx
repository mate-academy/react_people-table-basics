import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  interface Person {
    slug: string;
    name: string;
    sex: string;
    born: number;
    died: number;
    motherName: string | null;
    fatherName: string | null;
  }

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );

        if (!response.ok) {
          throw new Error('Error');
        }

        const data = await response.json();

        setPeople(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading ? (
              <Loader />
            ) : error ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <PeopleTable people={people} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
