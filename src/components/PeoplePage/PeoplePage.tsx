import { useEffect, useState } from "react";
import { Loader } from "../Loader";
import { Person } from "../../types";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      fetch('https://mate-academy.github.io/react_people-table/api/people.json', { method: 'GET' })
        .then(respose => respose.json())
        .then(response => {
          setPeople(response);
        }).catch(() => {
          setError('Something went wrong');
        }).finally(() => {
          setLoading(false);
        });
      }, 300);
  }, []);

  const getMotherLink = (motherName: string) => {
    const m = people.find(mName => mName.name === motherName);

    if (m) {
      return <Link
      to={`/people/${m.slug}`}
      className="has-text-danger"
    >
      {m.name}
    </Link>
    }

    return motherName;
  }

  const getFatherLink = (fatherName: string) => {
    const f = people.find(fName => fName.name === fatherName);

    if (f) {
      return <Link
      to={`/people/${f.slug}`}
    >
      {f.name}
    </Link>
    }

    return fatherName;
  }

  return (<>
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {error && <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>}

            {!loading && people.length === 0 && !error && <p data-cy="noPeopleMessage">There are no people on the server</p>}

            {!loading && !error && <table
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
                  return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({'has-background-warning' : slug === person.slug})}
                  >
                    <td>
                      <Link
                        to={`/people/${person.slug}`}
                        className={classNames({'has-text-danger' : person.sex === 'f'})}
                      >
                        {person.name}
                      </Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>{person.motherName ? getMotherLink(person.motherName) : '-'}</td>
                    <td>{person.fatherName ? getFatherLink(person.fatherName) : '-'}</td>
                  </tr>);
                })}
              </tbody>
            </table>}
          </div>
        </div>
  </>);
}
