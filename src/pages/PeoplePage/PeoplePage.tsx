import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../../components/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { humanId } = useParams();

  const displayPeopleTable = useMemo(() => {
    return !error && !loading && !!people.length;
  }, [error, loading, people]);

  const fetchPeople = () => {
    setError(false);
    setPeople([]);
    setLoading(true);
    getPeople()
      .then((data) => {
        const mappedPeople = data.map((person) => {
          const editedPerson = { ...person };
          const mother = data.find((p) => p.name === person.motherName);
          const father = data.find((p) => p.name === person.fatherName);

          if (mother) {
            editedPerson.mother = mother;
          }

          if (father) {
            editedPerson.father = father;
          }

          return editedPerson;
        });

        setPeople(mappedPeople);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPeople();
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

          {(!error && !loading && !people.length) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {displayPeopleTable && (
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
                {people.map((person) => (
                  <tr
                    data-cy="person"
                    className={cn(
                      { 'has-background-warning': person.slug === humanId },
                    )}
                  >
                    <td aria-label="person">
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {
                        person.mother
                          ? <PersonLink person={person.mother} />
                          : person.motherName || '-'
                      }
                    </td>
                    <td>
                      {
                        person.father
                          ? <PersonLink person={person.father} />
                          : person.fatherName || '-'
                      }
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
