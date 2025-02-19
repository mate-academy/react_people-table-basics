import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const peoples = await getPeople();

        setPeople(peoples);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {error ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : loading ? null : people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Born</th>
                    <th>Died</th>
                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>

                <tbody>
                  {people.map(person => {
                    const mother = people.find(
                      p => p.name === person.motherName,
                    );
                    const father = people.find(
                      p => p.name === person.fatherName,
                    );
                    const isSelected = person.slug === slug;

                    return (
                      <tr
                        data-cy="person"
                        key={person.slug}
                        className={isSelected ? 'has-background-warning' : ''}
                      >
                        <td>
                          <PersonLink person={person} />
                        </td>
                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {mother ? (
                            <PersonLink person={mother} />
                          ) : (
                            person.motherName || '-'
                          )}
                        </td>
                        <td>
                          {father ? (
                            <PersonLink person={father} />
                          ) : (
                            person.fatherName || '-'
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
