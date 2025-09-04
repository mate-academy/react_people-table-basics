import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader/Loader';

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await getPeople();

        setPeople(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  // Helper function to find person by name
  const findPersonByName = (name: string): Person | undefined => {
    return people.find(person => person.name === name);
  };

  // Helper function to create person link
  const createPersonLink = (name: string): JSX.Element => {
    const person = findPersonByName(name);

    if (!person) {
      return <span>{name}</span>;
    }

    const linkClass = person.sex === 'f' ? 'has-text-danger' : '';

    return (
      <Link to={`/people/${person.slug}`} className={linkClass}>
        {name}
      </Link>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (people.length === 0) {
    return (
      <div>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          </div>
        </div>
      </div>
    );
  }

  // Show the table with data
  return (
    <div>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
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
                  className={
                    slug === person.slug ? 'has-background-warning' : ''
                  }
                >
                  <td>
                    <Link
                      to={`/people/${person.slug}`}
                      className={person.sex === 'f' ? 'has-text-danger' : ''}
                    >
                      {person.name}
                    </Link>
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName
                      ? createPersonLink(person.motherName)
                      : '-'}
                  </td>
                  <td>
                    {person.fatherName
                      ? createPersonLink(person.fatherName)
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
