import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PersonLink, makeSlug } from '../components/PersonLink';

export type Person = {
  id: number;
  name: string;
  sex: 'male' | 'female' | string;
  born?: number | null;
  died?: number | null;
  mother?: string | null;
  father?: string | null;
};

const DATA_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(DATA_URL);

        if (!res.ok) {
          throw new Error(
            `Failed to load people (${res.status} ${res.statusText})`,
          );
        }

        const data = (await res.json()) as Person[];

        if (!cancelled) {
          setPeople(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load people');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const byName = useMemo(() => {
    const m = new Map<string, Person>();

    for (const p of people) {
      m.set(p.name, p);
    }

    return m;
  }, [people]);

  const selectedPerson = useMemo(() => {
    if (!slug) {
      return null;
    }

    return people.find(p => makeSlug(p.name) === slug) ?? null;
  }, [people, slug]);

  if (loading) {
    return (
      <div data-cy="app">
        <p data-cy="loader">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div data-cy="app">
        <p data-cy="peopleLoadingError" style={{ color: 'crimson' }}>
          {error}
        </p>
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div data-cy="app">
        <p data-cy="noPeopleMessage">No people found</p>
      </div>
    );
  }

  return (
    <div data-cy="app" className="bg-gray-100 min-h-screen p-8 font-sans">
      <h1 className="title">People Page</h1>
      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table
          data-cy="peopleTable"
          className="min-w-full table-auto border-collapse bg-white"
        >
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Sex</th>
              <th className="px-6 py-3 text-left">Born</th>
              <th className="px-6 py-3 text-left">Died</th>
              <th className="px-6 py-3 text-left">Mother</th>
              <th className="px-6 py-3 text-left">Father</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {people.map(person => {
              const isSelected = selectedPerson?.id === person.id;

              const mother =
                person.mother && byName.get(person.mother) ? (
                  <PersonLink person={byName.get(person.mother)!} />
                ) : person.mother ? (
                  person.mother
                ) : (
                  '-'
                );

              const father =
                person.father && byName.get(person.father) ? (
                  <PersonLink person={byName.get(person.father)!} />
                ) : person.father ? (
                  person.father
                ) : (
                  '-'
                );

              return (
                <tr
                  key={person.id}
                  data-cy="person"
                  className={`${isSelected ? 'has-background-warning' : ''} hover:bg-gray-50`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PersonLink person={person} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.sex}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {person.born ?? '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {person.died ?? '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{mother}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{father}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
