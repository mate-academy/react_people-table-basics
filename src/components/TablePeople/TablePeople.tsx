import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink';

export const TablePeople: React.FC = () => {
  const [getpeople, setGetPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(people => {
        if (!people.length) {
          setError('There are no people on the server');
        }

        setGetPeople(people);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Something went wrong');
        setIsLoading(false);
      });
  }, []);

  const getParent = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parentName = getpeople.find(person => person.name === name);

    if (parentName) {
      return <PersonLink person={parentName} />;
    }

    return name;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}
          {!!error && (
            <>
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
              {getpeople.length <= 0 && (
                <p data-cy="noPeopleMessage">
                  {error}
                </p>
              )}
            </>
          )}
          {getpeople.length > 0 && !isLoading && (
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
                {getpeople.map((person) => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={classnames({
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>{getParent(person.motherName)}</td>
                    <td>{getParent(person.fatherName)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
