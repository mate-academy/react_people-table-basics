import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import PeopleTable from '../components/PeopleTable';

export default function People() {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(setErrorMessage)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (slug && people.length > 0) {
      const person = people.find(p => p.slug === slug);

      if (person) {
        setSelectedPerson(person.name);
      }
    }
  }, [slug, people]);

  return (
    <main>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length && (
            <PeopleTable
              people={people}
              selectedPerson={selectedPerson}
              onSelect={name => setSelectedPerson(name)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
