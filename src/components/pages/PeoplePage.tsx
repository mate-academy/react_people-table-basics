import { FC, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import cn from 'classnames';

export const PeoplePage: FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { personSlug } = useParams();

  const personInfo = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  const personName = (name: string | null) => {
    return peoples.find(person => person.name === name);
  };

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeoples)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

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

  if (!peoples.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
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
              {peoples.map(person => {
                const findMother = personName(person.motherName);
                const findFather = personName(person.fatherName);

                return (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={cn({
                      'has-background-warning': person.slug === personSlug,
                    })}
                  >
                    <td>
                      <Link
                        to={`/people/${person.slug}`}
                        className={cn({
                          'has-text-danger': person.sex === 'f',
                        })}
                      >
                        {person.name}
                      </Link>
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {findMother ? (
                        <Link
                          to={`/people/${findMother.slug}`}
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
      </div>
    </>
  );
};
