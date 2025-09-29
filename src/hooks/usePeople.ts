// src/hooks/usePeople.ts
import { useCallback, useEffect, useState } from 'react';
import { Person } from '../types/Person';

const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

type UsePeopleReturn = {
  people: Person[] | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
};

export function usePeople(): UsePeopleReturn {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadIndex, setReloadIndex] = useState<number>(0);

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    // reset error at start of a fresh request
    setError(null);

    try {
      const res = await fetch(API_URL, { signal });

      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.status}`);
      }

      const data = (await res.json()) as Person[];

      // success: even if array is empty, consider this a successful load
      setPeople(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err: unknown) {
      // If the request was aborted, do not show a loading error in the UI
      if (err instanceof Error && err.name === 'AbortError') {
        // keep previous error (should be null) and just stop loading
        // do not setError here
      } else {
        // non-abort error -> show error and mark people as null (no valid data)
        const message =
          err instanceof Error ? err.message : String(err ?? 'Unknown error');

        setError(message);
        setPeople(null);
        /* eslint-disable-next-line no-console */
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    load(signal).catch(() => {
      /* load handles errors */
    });

    return () => {
      controller.abort();
    };
  }, [load, reloadIndex]);

  const reload = useCallback(() => {
    setReloadIndex(i => i + 1);
  }, []);

  return { people, loading, error, reload };
}

export default usePeople;
