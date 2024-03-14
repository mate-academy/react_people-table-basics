import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
        setIsErrorShown(false);
      } catch {
        setIsErrorShown(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}
        {isErrorShown && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {people?.length ? (
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
                  className={cn({
                    'has-background-warning': person.slug === slug,
                  })}
                >
                  <td>
                    <PersonLink
                      person={person}
                      aria-label={`Link to ${person.slug}`}
                    />
                  </td>

                  <td>{person.sex}</td>

                  <td>{person.born}</td>

                  <td>{person.died}</td>

                  {/* eslint-disable */}
                  <td>
                    {person.motherName &&
                    people.some(p => p.name === person.motherName) ? (
                      <Link
                        to={`/people/${
                          people.find(p => p.name === person.motherName)?.slug
                        }`}
                        className="has-text-danger"
                      >
                        {person.motherName}
                      </Link>
                    ) : person.motherName || '-'
                    }
                  </td>

                  <td>
                    {person.fatherName &&
                    people.some(p => p.name === person.fatherName) ? (
                        <Link to={`/people/${
                          people.find(p => p.name === person.fatherName)?.slug
                        }`}>
                          {person.fatherName}
                        </Link>
                    ) : person.fatherName || '-'
                    }
                  </td>
                  {/* eslint-enable */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )
        )}
      </div>
    </div>
  );
};
