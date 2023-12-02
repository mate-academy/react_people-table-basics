/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then((respone) => {
        const peopleWithParents: Person[] = respone.map(person => {
          person.mother = respone.find(curr => curr.name === person.motherName);
          person.father = respone.find(curr => curr.name === person.fatherName);

          return person;
        });

        setPeople(peopleWithParents);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable people={people} selectedSlug={slug} />
          )}
        </div>
      </div>
    </div>
  );
};
