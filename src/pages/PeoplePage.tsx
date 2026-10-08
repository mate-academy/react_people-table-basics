import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError(false);

    getPeople()
      .then(response => {
        if (isMounted) {
          const peopleWithRelations = response.map(person => {
            const mother = response.find(
              candidate => candidate.name === person.motherName,
            );
            const father = response.find(
              candidate => candidate.name === person.fatherName,
            );

            return {
              ...person,
              mother: mother ?? undefined,
              father: father ?? undefined,
            };
          });

          setPeople(peopleWithRelations);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {!loading && error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !error && people.length > 0 && (
        <PeopleTable people={people} selectedSlug={slug ?? null} />
      )}
    </>
  );
};
