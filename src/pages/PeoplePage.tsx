import { useEffect } from 'react';
import { usePeople } from '../context/PeopleContext';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const { setPeople, setLoading, setError } = usePeople();

  useEffect(() => {
    setLoading(true);
    setError(null);

    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      });
  }, [setPeople, setLoading, setError]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          <PeopleTable />
        </div>
      </div>
    </>
  );
};
