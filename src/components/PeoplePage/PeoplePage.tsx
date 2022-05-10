import React, { useEffect, useState } from 'react';
import { RevolvingDot } from 'react-loader-spinner';
import { getPeople } from '../../api/api';
import { People } from '../../types/people';
import PeopleTable from '../PeopleTable/PeopleTable';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);

  useEffect(() => {
    getPeople()
      .then(response => {
        return setPeople(response);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {(people.length === 0)
        ? <RevolvingDot color="blue" />
        : <PeopleTable people={people} /> }
    </>
  );
};

export default PeoplePage;
