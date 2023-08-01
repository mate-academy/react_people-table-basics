import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const parents = (data: Person[]) => {
    const preparedData = data.map((person) => {
      return {
        ...person,
        mother: data.find(m => m.name === person.motherName),
        father: data.find(f => f.name === person.fatherName),
      };
    });

    setPeople(preparedData);
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(parents)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People page</h1>
      <PeopleTable
        people={people}
        loading={loading}
        isError={isError}
      />
    </>
  );
};
