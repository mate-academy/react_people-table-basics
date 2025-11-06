import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams<{ slug?: string }>();
  const [activeSlug, setActiveSlug] = useState<string | null>(slug || null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isLoading && slug) {
      setActiveSlug(slug);
    }
  }, [isLoading, slug]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="block">
        <div className="box table-container">
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        </div>
      </div>
    );
  }

  if (!people.length) {
    return (
      <div className="block">
        <div className="box table-container">
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="block">
        <div className="box table-container">
          <h1 className="title">People Page</h1>
        </div>
      </div>

      {isLoading ? (
        <Loader />
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
            {people.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                onClick={() => {
                  navigate(`/people/${person.slug}`);
                  // setActiveSlug(person.slug);
                }}
                className={
                  activeSlug === person.slug ? 'has-background-warning' : ''
                }
              >
                <td>
                  <PersonLink name={person.name} people={people} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  <PersonLink name={person.motherName} people={people} />
                </td>
                <td>
                  <PersonLink name={person.fatherName} people={people} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
