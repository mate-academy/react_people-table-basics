import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import type { Person } from '../types';

type Status = 'loading' | 'loaded' | 'error';
type SortField = 'name' | 'sex' | 'born' | 'died';
type SortOrder = 'asc' | 'desc';

// The API gives parent names as strings, so we resolve them to Person objects
// once after loading to simplify rendering links in the table.
const preparePeople = (loadedPeople: Person[]) => {
  const peopleWithRelations = loadedPeople.map(person => ({ ...person }));
  const peopleByName = new Map(
    peopleWithRelations.map(person => [person.name, person]),
  );

  return peopleWithRelations.map(person => ({
    ...person,
    mother: person.motherName ? peopleByName.get(person.motherName) : undefined,
    father: person.fatherName ? peopleByName.get(person.fatherName) : undefined,
  }));
};

export const PeoplePage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  // Filters and sorting live in the URL so the current view can be shared.
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams
    .getAll('centuries')
    .map(Number)
    .filter(century => !Number.isNaN(century));
  const rawSort = searchParams.get('sort');
  const rawOrder = searchParams.get('order');
  const currentSort =
    rawSort === 'name' ||
    rawSort === 'sex' ||
    rawSort === 'born' ||
    rawSort === 'died'
      ? rawSort
      : null;
  const currentOrder: SortOrder = rawOrder === 'desc' ? 'desc' : 'asc';

  const availableCenturies = [
    ...new Set(people.map(person => Math.ceil(person.born / 100))),
  ].sort((firstCentury, secondCentury) => firstCentury - secondCentury);

  const normalizedQuery = query.toLowerCase();

  // We derive the visible rows from the full dataset instead of storing
  // filtered/sorted copies in state, so the UI always reflects the URL params.
  const visiblePeople = people
    .filter(person => {
      const matchesQuery =
        normalizedQuery === '' ||
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery);

      const personCentury = Math.ceil(person.born / 100);
      const matchesCentury =
        selectedCenturies.length === 0 ||
        selectedCenturies.includes(personCentury);

      return matchesQuery && matchesCentury;
    })
    .sort((firstPerson, secondPerson) => {
      if (!currentSort) {
        return 0;
      }

      const firstValue = firstPerson[currentSort];
      const secondValue = secondPerson[currentSort];

      if (typeof firstValue === 'string' && typeof secondValue === 'string') {
        const result = firstValue.localeCompare(secondValue);

        return currentOrder === 'desc' ? -result : result;
      }

      const result = Number(firstValue) - Number(secondValue);

      return currentOrder === 'desc' ? -result : result;
    });

  // Updating a cloned URLSearchParams keeps changes localized and avoids
  // rewriting unrelated params by hand in each event handler.
  const updateSearchParams = (updater: (params: URLSearchParams) => void) => {
    const newParams = new URLSearchParams(searchParams);

    updater(newParams);
    setSearchParams(newParams);
  };

  const handleQueryChange = (value: string) => {
    updateSearchParams(params => {
      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }
    });
  };

  const handleCenturyToggle = (century: number) => {
    updateSearchParams(params => {
      const nextCenturies = params
        .getAll('centuries')
        .map(Number)
        .filter(value => !Number.isNaN(value));
      const hasCentury = nextCenturies.includes(century);
      let updatedCenturies = nextCenturies.filter(value => value !== century);

      if (!hasCentury) {
        updatedCenturies = [...nextCenturies, century].sort(
          (firstValue, secondValue) => firstValue - secondValue,
        );
      }

      params.delete('centuries');
      updatedCenturies.forEach(value =>
        params.append('centuries', String(value)),
      );
    });
  };

  const handleResetCenturies = () => {
    updateSearchParams(params => {
      params.delete('centuries');
    });
  };

  const handleSort = (field: SortField) => {
    updateSearchParams(params => {
      // Sorting cycles through: ascending -> descending -> disabled.
      if (currentSort !== field) {
        params.set('sort', field);
        params.delete('order');

        return;
      }

      if (currentOrder === 'asc') {
        params.set('sort', field);
        params.set('order', 'desc');

        return;
      }

      params.delete('sort');
      params.delete('order');
    });
  };

  useEffect(() => {
    // Ignore late responses if the page unmounts before the request finishes.
    let isMounted = true;

    getPeople()
      .then(loadedPeople => {
        if (!isMounted) {
          return;
        }

        setPeople(preparePeople(loadedPeople));
        setStatus('loaded');
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setStatus('error');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="columns">
        {status === 'loaded' && people.length > 0 && (
          <div className="column is-one-quarter-desktop">
            <PeopleFilters
              query={query}
              centuries={selectedCenturies}
              availableCenturies={availableCenturies}
              onQueryChange={handleQueryChange}
              onCenturyToggle={handleCenturyToggle}
              onResetCenturies={handleResetCenturies}
            />
          </div>
        )}

        <div className="column">
          <div className="block">
            <div className="box table-container">
              {status === 'loading' && <Loader />}

              {status === 'error' && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {status === 'loaded' && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {status === 'loaded' && people.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={slug}
                  currentSort={currentSort}
                  currentOrder={currentOrder}
                  onSort={handleSort}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
