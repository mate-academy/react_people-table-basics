import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from './PeopleTable';

type Props = {};

export const PeoplePage: React.FC<Props> = props => {
  const {} = props;
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPeople();

        setPeople(data);
        setLoading(false);
        setLoadingError(false);
      } catch (error) {
        setLoading(false);
        setLoadingError(true);
      }
    })();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={people}
        loading={loading}
        loadingError={loadingError}
      />
    </>
  );
};
