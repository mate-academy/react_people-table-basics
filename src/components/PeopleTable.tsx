import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

interface Parent {
  name: string;
  slug: string;
}

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const { slug } = useParams();
  let parents: Parent = {
    name: '',
    slug: '',
  };

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

  function doesThePersonExist(name: string) {
    const parent: Person | undefined = people.find(
      person => person.name === name,
    );

    if (parent) {
      parents = {
        name: parent.name,
        slug: parent.slug,
      };

      return true;
    }

    return false;
  }

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
                  {person.motherName &&
                  doesThePersonExist(person.motherName) ? (
                    <td>
                      <Link
                        to={`/people/${parents.slug}`}
                        className="has-text-danger"
                      >
                        {parents.name}
                      </Link>
                    </td>
                  ) : (
                    <td>{person.motherName ? person.motherName : '-'}</td>
                  )}

                  {person.fatherName &&
                  doesThePersonExist(person.fatherName) ? (
                    <td>
                      <Link to={`/people/${parents.slug}`}>
                        {parents.name}
                      </Link>
                    </td>
                  ) : (
                    <td>{person.fatherName ? person.fatherName : '-'}</td>
                  )}
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
