import React, { useEffect, useState } from 'react';

import { Loader } from '../../components/Loader';
import { People } from '../../components/People';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleProvider } from '../../contexts';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [peopleLookup, setPeopleLookup] = useState<Map<string, Person>>(
    new Map(),
  );

  const { slug: personSlug } = useParams<{ slug?: string }>();

  useEffect(() => {
    setLoading(true);
    setError('');

    getPeople()
      .then((data: Person[]) => {
        setPeople(data);

        const newLookup = new Map<string, Person>();

        data.forEach(p => {
          newLookup.set(p.name, p);
        });

        setPeopleLookup(newLookup);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {loading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {!loading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && !error && people.length > 0 ? (
          <PeopleProvider peopleLookup={peopleLookup}>
            <People people={people} selectedPersonSlug={personSlug || null} />
          </PeopleProvider>
        ) : null}
      </div>
    </div>
  );
};
