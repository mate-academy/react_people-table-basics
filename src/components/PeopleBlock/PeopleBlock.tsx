import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

enum Erorr {
  NO,
  SERVER,
  NOPEOPLE,
}

export const PeopleTable = () => {
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [load, setLoad] = useState(false);
  const [erorr, setErorr] = useState<Erorr>(Erorr.NO);
  const { slug = '' } = useParams();

  const loadPeople = async () => {
    setLoad(true);

    const people = await getPeople().catch(() => setErorr(Erorr.SERVER));

    if (people) {
      if (people.length === 0) {
        setErorr(Erorr.NOPEOPLE);
      }

      setVisiblePeople(people);
    }

    setLoad(false);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {load && <Loader />}

          {erorr === Erorr.SERVER && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {erorr === Erorr.NOPEOPLE && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            {visiblePeople.length > 0 && (
              <>
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
                  {visiblePeople.map(people => (
                    <tr
                      data-cy="person"
                      className={classNames(
                        { 'has-background-warning': slug === people.slug },
                      )}
                    >
                      <td>
                        <Link
                          to={`../${people.slug}`}
                          className={classNames(
                            { 'has-text-danger': people.sex === 'f' },
                          )}
                        >
                          {people.name}
                        </Link>
                      </td>

                      <td>{people.sex}</td>
                      <td>{people.born}</td>
                      <td>{people.died}</td>
                      <PersonLink
                        people={visiblePeople}
                        personName={people.motherName}
                      />
                      <PersonLink
                        people={visiblePeople}
                        personName={people.fatherName}
                      />
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
};
