import { useEffect, useState } from "react";
import { Person } from "../types";
import { getPeople } from "../api";
import { Loader } from "./Loader";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";


export const PeoplePage = () => {

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { personSlug } = useParams();

  const personInfo = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  const personName = (name: string | null) => {
    return people.find(person => person.name === name);
  }


  useEffect(() => {
   setLoading(true)
   getPeople()
   .then(data => {
    setPeople(data)
    setLoading(false)
   })
   .catch(err => {
     setError('Failed to load people data')
     setLoading(false)
   })
  }, [])


  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }


  return (
    <div>
      <h1 className="title">People Page</h1>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {personInfo.map(info => (
              <th key={info}>{info}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {people.map((person) => {
            const findMother = personName(person.motherName);
            const findFather = personName(person.fatherName);

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={classNames({
                  "has-background-warning": person.slug === personSlug,
                })}
              >
                <td>
                  <Link
                    to={`/people/${person.slug}`}
                    className={classNames({
                      "has-text-danger": person.sex === "f",
                    })}
                  >
                    {person.name}
                  </Link>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died || "-"}</td>
                <td>
                  {findMother ? (
                    <Link to={`/people/${findMother.slug}`}
                      className={'has-text-danger'}
                    >
                      {person.motherName}
                      </Link>
                  ) : (
                    <>{person.motherName || '-'}</>
                  )}
                </td>
                <td>
                  {findFather ? (
                    <Link to={`/people/${findFather.slug}`}>
                      {person.fatherName}
                      </Link>
                  ) : (
                    <>{person.fatherName || '-'}</>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
