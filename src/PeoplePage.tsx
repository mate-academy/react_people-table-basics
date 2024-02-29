import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from './types';
import { Loader } from './components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { tabId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );

        if (!response.ok) {
          setError('Something went wrong');

          return;
        }

        const data = await response.json();

        setPeople(data);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="box table-container">
          <Loader />
        </div>
      );
    }

    if (error) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      );
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
          {people.map((person: Person) => (
            <tr
              key={person.slug}
              data-cy="person"
              className={tabId === person.slug ? 'has-background-warning' : ''}
            >
              <td>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <PersonLink name={person.name} people={people} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink name={person.motherName} people={people} />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink name={person.fatherName} people={people} />
                ) : (
                  '-'
                )}
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
      {renderContent()}
    </>
  );
};
