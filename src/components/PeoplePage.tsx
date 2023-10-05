import { Loader } from "./Loader/Loader"
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams } from "react-router-dom";
import { PersonLink } from "./PersonLink";
// import { PeoplePageProps } from "../types/Person";

export const PeoplePage = () => {

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((data) => {
        setPeople(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
        setPeople([]);
      });
  }, []);


  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {hasError ? (
            <p data-cy="peopleLoadingError">Something went wrong</p>
          ) : isLoading ? (
            <Loader />
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
                {people.map((person, index) => (
                  <>
                    <tr
                      data-cy="person"
                      key={index}
                      className={slug === person.slug ? 'has-background-warning' : ''}
                    >
                      <td>
                        <PersonLink person={person.name} people={people} />
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        <PersonLink person={person.motherName || ''} people={people} />
                      </td>
                      <td>
                        <PersonLink person={person.fatherName || ''} people={people} />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div >
    </>
  );
};
