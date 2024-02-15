import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';

// eslint-disable-next-line max-len
const peopleFromServer = fetch(
  'https://mate-academy.github.io/react_people-table/api/people.json'
);

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const { peopleId } = useParams();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await peopleFromServer;
        const data = await response.json();

        setPeople(data);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
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
              key={person.slug}
              data-cy="person"
              className={cn('', {
                'has-background-warning': peopleId === person.slug,
              })}
            >
              <PersonLink person={person} />

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {person.motherName === null ? (
                <td>-</td>
              ) : (
                <td>{person.motherName}</td>
              )}
              {person.fatherName === null ? (
                <td>-</td>
              ) : (
                <td>{person.fatherName}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
          {!people && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
