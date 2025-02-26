import { useContext, useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleContext } from '../PeopleContext/PeopleContext';

export const PeoplePage = () => {
  const [loader, setLoader] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('PeoplePage must be used within a PeopleProvider');
  }

  const { setPeople } = context;

  useEffect(() => {
    setLoader(true);

    getPeople()
      .then(setPeople)
      .catch(e => {
        setErrorLoading(true);
        throw e;
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <PeopleTable loader={loader} errorLoading={errorLoading} />
      </div>
    </>
  );
};
