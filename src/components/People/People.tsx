import { getPeople } from '../../api';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const People = () => {

  const [people, setPeople] = useState<Person[] | []>([]);
  const [error, setError] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const fetchedPeople = await getPeople();
        setPeople(fetchedPeople);

        if (slug) {
          const personToHighlight = fetchedPeople.find((person) => person.slug === slug);
          if (personToHighlight) {
            setSelectedPerson(personToHighlight);
          }
        }

      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const selectPerson = (person: Person) => {
    setSelectedPerson(person);
    navigate(`/people/${person.slug}`, { replace: false });
  };


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

          {!loading && !error && !people.length && (
            <p data-cy="noPeopleMessage" className="has-text-warning">
              There are no people available to display.
            </p>
          )}

          {!loading && !error && people.length > 0 && (
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

                {people.map((person: Person) => {
                  const mother = people.find((p) => p.name === person.motherName);
                  const father = people.find((p) => p.name === person.fatherName);

                  return (
                    <tr data-cy="person" key={person.name} className={selectedPerson?.name === person.name ? "has-background-warning" : ''}>
                      <td>
                        <Link to={`/people/${person.slug}`} onClick={() => selectPerson(person)} className={person.sex === 'f' ? 'has-text-danger' : ''}>{person.name}</Link>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {mother ? (
                          <Link to={`/people/${mother.slug}`} className="has-text-danger" onClick={() => selectPerson(mother)}>
                            {mother.name}
                          </Link>
                        ) : (
                          person.motherName || '-'
                        )}
                      </td>
                      <td>
                        {father ? (
                          <Link to={`/people/${father.slug}`} onClick={() => selectPerson(father)}>
                            {father.name}
                          </Link>
                        ) : (
                          person.fatherName || '-'
                        )}
                      </td>
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}
