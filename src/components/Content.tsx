import React, { useEffect, useState } from 'react';
import { peopleApi } from '../services/peopleApi';
import { DataPerson } from '../types/DataPerson';
import { Loader } from './Loader';
import { TablePeople } from './TablePeople';

export const Content = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DataPerson[] | null>(null);

  useEffect(() => {
    const fetchPeopleApi = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await fetch(peopleApi);
        const d = await response.json();

        setData(d);
      } catch (e) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPeopleApi();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {!loading && data?.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && data?.length > 0 && <TablePeople people={data} />}
      </div>
    </div>
  );
};
