import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const match = useMatch('/people/:slug');
  const selectedPersonSlug = match?.params.slug;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (loading) {
      getPeople()
        .then(setPeople)
        .catch(() => setErrorMessage('Something went wrong'));
    }
  }, [people]);

  return (
    <>
      <div className="block">
        <h1 className="title">People Page</h1>
        <PeopleTable
          people={people}
          errorMessage={errorMessage}
          loading={loading}
          selectedPersonSlug={selectedPersonSlug}
        />
      </div>
    </>
  );
};
