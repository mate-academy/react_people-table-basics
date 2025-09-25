import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import PeopleTable from '../components/PeopleTable/PeopleTable';
import React from 'react';

const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(res => res.json())
      .then((data: Person[]) => setPeople(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>People Page</h1>
      <PeopleTable people={people} selectedSlug={slug} />
    </div>
  );
};

export default PeoplePage;
