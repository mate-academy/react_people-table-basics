import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { useEffect, useState } from 'react';

const mapPeople = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(p => p.name === person.motherName) || undefined;
    const father = people.find(p => p.name === person.fatherName) || undefined;

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then((peopleFromServer: Person[]) => {
        const mappedPeople = mapPeople(peopleFromServer);

        setPeople(mappedPeople);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}
          {error && !loading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}
          {!people.length && !loading && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!loading && !error && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </div>
  );
};
