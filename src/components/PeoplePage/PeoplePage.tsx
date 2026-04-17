import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [selectedPersonName, setSelectedPersonName] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [peoples, setPeoples] = useState<Person[]>([]);

  const { slug } = useParams();

  useEffect(() => {
    async function fetchData() {
      setError(null);

      try {
        setLoader(true);
        const peoplesData = await getPeople();

        setPeoples(peoplesData);
      } catch {
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoader(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!slug || peoples.length === 0) {
      return;
    }

    const person = peoples.find(p => p.slug === slug);

    if (person) {
      setSelectedPersonName(person.name);
    } else {
      setSelectedPersonName('');
    }
  }, [slug, peoples]);

  const hasPeople = peoples.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}

          {hasPeople && (
            <PeopleTable selected={selectedPersonName} people={peoples} />
          )}

          {!loader && !error && !hasPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
      </div>
    </>
  );
};
