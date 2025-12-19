import { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { useParams, useNavigate } from 'react-router-dom';

interface RawPerson extends Omit<Person, 'sex'> {
  sex: 'm' | 'f';
}
function normalize(raw: RawPerson[]): Person[] {
  return raw.map(p => {
    const normalizedSex = p.sex === 'f' ? 'female' : 'male';

    return {
      ...p,
      sex: normalizedSex,
    };
  });
}

export function PeoplePage(): JSX.Element {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(slug);
  const [loading, setLoading] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const url =
    'https://mate-academy.github.io/react_people-table/api/people.json';

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(r => r.json())
      .then(data => normalize(data as RawPerson[]))
      .then(setPeople)
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (slug) {
      setSelectedSlug(slug);
    } else {
      setSelectedSlug(undefined);
    }
  }, [slug]);

  if (loading === true) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error !== null) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people && people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  if (people) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <PeopleTable
          people={people}
          selectedSlug={selectedSlug}
          onSelect={newSlug => navigate(`/people/${newSlug}`)}
        />
      </>
    );
  }

  return <h1 className="title">People Page</h1>;
}
