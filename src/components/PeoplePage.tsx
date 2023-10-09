import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from './PersonInfo';
import { Loader } from './Loader/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
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

  const renderContent = () => {
    if (hasError) {
      return <p data-cy="peopleLoadingError">Something went wrong</p>;
    }

    if (isLoading) {
      return <Loader />;
    }

    if (people.length === 0) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    return (
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
            <tr
              data-cy="person"
              key={person.slug}
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
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {renderContent()}
        </div>
      </div>
    </>
  );
};
