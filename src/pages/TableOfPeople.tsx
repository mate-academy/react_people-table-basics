import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from '../components/Loader/Loader';

export const TableOfPeople: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [errorLoad, setErroreLoad] = useState(false);

  const { slug = '' } = useParams();

  useEffect(() => {
    setIsLoad(true);
    getPeople()
      .then((res) => {
        setPeople(res);
      })
      .catch(() => setErroreLoad(true))
      .finally(() => setIsLoad(false));
  }, []);

  const isSelected = (person: Person) => person.slug === slug;

  const findMother = (person: Person) => people
    .find(mother => person.motherName === mother.name);
  const findFather = (person: Person) => people
    .find(father => father.name === person.fatherName);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoad && <Loader />}

          {errorLoad && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people && !isLoad && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
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
              {people.map(person => (

                <tr
                  data-cy="person"
                  className={cn({
                    'has-background-warning': isSelected(person),
                  })}
                  key={person.slug}
                >
                  <td>
                    <Link
                      to={`/people/${person.slug}`}
                      style={{ color: person.sex === 'f' ? 'red' : 'blue' }}
                    >
                      {person.name}
                    </Link>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>

                    {findMother(person)
                      ? (
                        <Link to={`/people/${findMother(person)?.slug}`} style={{ color: 'red' }}>
                          {person.motherName}
                        </Link>
                      )
                      : person.motherName || '-'}
                  </td>
                  <td>
                    {findFather(person)
                      ? (
                        <Link to={`/people/${findFather(person)?.slug}`}>
                          {person.fatherName}
                        </Link>
                      )
                      : person.fatherName || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
