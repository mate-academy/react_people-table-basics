import { Loader } from '../components/Loader';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import PersonLink from '../components/PersonLink';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [userData, setUserData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        const preparedData = data.map((person: Person) => {
          let mother = null;
          let father = null;

          if (person.motherName) {
            mother =
              data.find(
                (personMother: Person) =>
                  personMother.name === person.motherName,
              ) || null;
          }

          if (person.fatherName) {
            father =
              data.find(
                (personFather: Person) =>
                  personFather.name === person.fatherName,
              ) || null;
          }

          return {
            ...person,
            father,
            mother,
          } as Person;
        });

        setUserData(preparedData);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !userData.length && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!userData.length && (
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
                {userData.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={
                      person.slug === slug ? 'has-background-warning' : ''
                    }
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother ? (
                        <PersonLink person={person.mother} />
                      ) : (
                        person.motherName || '-'
                      )}
                    </td>
                    <td>
                      {person.father ? (
                        <PersonLink person={person.father} />
                      ) : (
                        person.fatherName || '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};