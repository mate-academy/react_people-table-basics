import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { People } from '../components/PeopleList';

function findParent(data: Person[] | null, name: string | null): Person | null {
  if (!data || !name) {
    return null;
  }

  return data.find(person => person.name === name) ?? null;
}

export const PeoplePage: React.FC = () => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(res => {
        const aggregatePeople = res.map(person => {
          return {
            ...person,
            mother: findParent(res, person.motherName),
            father: findParent(res, person.fatherName),
          };
        });

        setData(aggregatePeople);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!isLoading && <People people={data} slug={slug} />}
        </div>
      </div>
    </>
  );
};
