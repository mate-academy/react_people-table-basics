import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from './PeopleTable';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { slug } = useParams<{ slug?: string }>();

  const findParents = (persones: Person[]) => {
    const peopleWithParents = persones.map(person => ({
      ...person,
      mother:
        persones.find(parent => parent.name === person.motherName) || null,
      father:
        persones.find(parent => parent.name === person.fatherName) || null,
    }));

    return peopleWithParents;
  };

  const fetchPeoples = async () => {
    try {
      setLoading(true);

      const response = await getPeople();

      const peopleWithParents = findParents(response);

      if (peopleWithParents.length > 0) {
        setPeople(peopleWithParents);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeoples();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : error ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : (
            <PeopleTable people={people} activeSlug={slug} />
          )}
        </div>
      </div>
    </>
  );
};
