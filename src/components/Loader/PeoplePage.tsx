import React, { useEffect, useState, useMemo } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from '../PeopleTable';
import { PostFilter } from '../PostFilter';
import { useSearchParams } from 'react-router-dom';

interface Person {
  slug: string;
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName?: string;
  fatherName?: string;
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || 'asc';
  const sex = searchParams.get('sex') || '';

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(res => {
        if (!res.ok) {
          throw new Error();
        }

        return res.json();
      })
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSort = (column: string) => {
    const params = new URLSearchParams(searchParams);

    if (sortField !== column) {
      params.set('sort', column);
      params.delete('order');
    } else if (sortField === column && !searchParams.get('order')) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params, { replace: true });
  };

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (query) {
      const lowerQuery = query.toLowerCase();

      result = result.filter(
        p =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.motherName?.toLowerCase().includes(lowerQuery) ||
          p.fatherName?.toLowerCase().includes(lowerQuery),
      );
    }

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(p => {
        const pCentury = Math.ceil(p.born / 100).toString();

        return centuries.includes(pCentury);
      });
    }

    if (sortField) {
      result.sort((a, b) => {
        const valueA = a[sortField as keyof Person] ?? '';
        const valueB = b[sortField as keyof Person] ?? '';

        const multiplier = sortOrder === 'desc' ? -1 : 1;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB) * multiplier;
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return (valueA - valueB) * multiplier;
        }

        return 0;
      });
    }

    return result;
  }, [people, query, centuries, sortField, sortOrder, sex]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      {!isLoading && !isError && <PostFilter />}

      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !isError && people.length > 0 && (
          <PeopleTable
            people={filteredPeople}
            sortBy={sortField}
            sortOrder={
              sortField
                ? searchParams.get('order') === 'desc'
                  ? 'desc'
                  : 'asc'
                : null
            }
            onSort={handleSort}
          />
        )}

        {!isLoading && !isError && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
      </div>
    </div>
  );
};
