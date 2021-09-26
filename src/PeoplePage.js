import React, { useEffect, useState } from 'react';
import { getPeople } from './api';
import PeopleTable from './PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople().then((res) => {
      setPeople(res);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <span className="icon-text has-text-warning">
      <span className="icon">
        <i className="fas fa-spinner fa-pulse" />
      </span>
      <span>Loading</span>
    </span>
  ) : (
    <>
      <h1 className="title is-4">People page</h1>
      <PeopleTable people={people} />
    </>
  );
};

export default PeoplePage;
