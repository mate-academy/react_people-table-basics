import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
    .then(setPeople)
    .catch(() => setIsError(true))
    .finally(() => setIsLoading(false));
  }, []);

  const person = slug ? people.find(p => p.slug === slug) : null;


  const isExist = (name: string) => {
    const person = people.find(p => p.name === name);
    return person ? <PersonLink person={person} /> : name;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading ? (
              <Loader />
            ) : isError ? (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                ) : person ? (
                    <div>
                      <h2>{person.name}</h2>
                      <p>{person.sex}</p>
                      <p>{person.born}</p>
                      <p>{person.died}</p>
                      <p>{person.motherName || "-"}</p>
                      <p>{person.fatherName || "-"}</p>
                    </div>
                ) : people.length === 0 ? (
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
                      {people.map((person) => (
                        <tr data-cy="person" key={person.slug} className={slug === person.slug ? 'has-background-warning' : ''}>
                          <td><PersonLink person={person} /></td>
                          <td>{person.sex}</td>
                          <td>{person.born}</td>
                          <td>{person.died}</td>
                          <td>{person.motherName ? isExist(person.motherName) : '-'}</td>
                          <td>{person.fatherName ? isExist(person.fatherName) : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
          </div>
        </div>
    </>
  )
}
