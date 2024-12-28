import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

const getPersonClass = (person: Person) =>
  classNames('', { 'has-text-danger': person.sex === 'f' });

const getPersonLink = (personName: string, personBorn: number) =>
  `${personName.toLowerCase().split(' ').join('-')}-${personBorn}`;

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [peopleWithParents, setPeopleWithParents] = useState<Person[]>([]);
  const { personName } = useParams();

  const normalizePersonName = personName || '';

  useEffect(() => {
    setLoading(true);

    const fetchPeople = async () => {
      try {
        const peopleFormServer = await getPeople();

        setPeople(peopleFormServer);
      } catch (e) {
        setErrorMessage('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPeople ();
  }, []);

  useEffect(() => {
    const peopleWithParent = people.map(person => {
      const mom = people.find(m => m.name === person.motherName);
      const dad = people.find(d => d.name === person.fatherName);

      return {
        ...person,
        mother: mom,
        father: dad,
        slug: getPersonLink(person.name, person.born),
      };
    });

    setPeopleWithParents(peopleWithParent);
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && !loading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!loading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length !== 0 && (
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
                {peopleWithParents.map(person => (
                  <tr
                    data-cy="person"
                    className={classNames('', {
                      'has-background-warning':
                        normalizePersonName === person.slug,
                    })}
                    key={person.slug}
                  >
                    <td>
                      <NavLink
                        to={`../${getPersonLink(person.name, person.born)}`}
                        className={getPersonClass(person)}
                      >
                        {person.name}
                      </NavLink>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    {person.mother ? (
                      <td>
                        <NavLink
                          to={`../${getPersonLink(person.mother.name, person.mother.born)}`}
                          className="has-text-danger"
                        >
                          {person.mother.name}
                        </NavLink>
                      </td>
                    ) : (
                      <td>{person.motherName || '-'}</td>
                    )}

                    {person.father ? (
                      <td>
                        <NavLink
                          to={`../${getPersonLink(person.father.name, person.father.born)}`}
                        >
                          {person.father.name}
                        </NavLink>
                      </td>
                    ) : (
                      <td>{person.fatherName || '-'}</td>
                    )}
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
