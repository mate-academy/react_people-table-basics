import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      {people.length
        ? (
          <PeopleTable
            people={people}
            selectedPerson={slug}
          />
        )
        : <Loader />}
    </div>
  );
};
