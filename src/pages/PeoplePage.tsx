import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

function findParent(data: Person[], name: string | null): Person | undefined {
  if (!name) {
    return undefined;
  }

  return data.find(person => person.name === name);
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(res => {
        const aggregatePeople = res.map(person => {
          return {
            ...person,
            mother: findParent(res, person.motherName),
            father: findParent(res, person.fatherName),
          };
        });

        setPeople(aggregatePeople);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}

      {!loading && <PeopleTable people={people} slug={slug} />}
    </>
  );
};
