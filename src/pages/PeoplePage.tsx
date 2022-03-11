import React, { useEffect, useState } from 'react';

import { getPeople } from '../api/people';
import PeopleTable from '../components/PeopleTable/PeopleTable';
import { Person } from '../types/person';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer));
  }, []);

  return (
    <PeopleTable people={people} />
  );
};

export default PeoplePage;
