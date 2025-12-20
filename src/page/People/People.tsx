import { useEffect, useState } from 'react';
import { getPeople } from '../../utils/api';
import type { Person } from '../../types';
import { PeopleList } from '../../components/PeopleList/PeopleList';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorLoad, setErrorLoad] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(error => {
        setErrorLoad('Something went wrong');
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          <PeopleList
            peoplelist={people}
            loader={loading}
            errortext={errorLoad}
          />
        </div>
      </div>
    </>
  );
};
