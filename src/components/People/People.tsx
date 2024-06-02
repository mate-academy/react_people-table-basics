/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types';
import cn from 'classnames';
import { Link, useNavigate, useParams } from 'react-router-dom';

enum Message {
  peopleLoadingError = 'Something went wrong',
  noPeopleMessage = 'There are no people on the server',
}

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Message | null>(null);
  const [dataLoader, setDataLoader] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  const REDIRECT_TIME = 3000;

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(res => {
        setPeople([...res]);
        setDataLoader(true);
      })
      .catch(() => {
        setError(Message.peopleLoadingError);
        setTimeout(() => navigate('/'), REDIRECT_TIME);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (dataLoader && people.length === 0) {
      setError(Message.noPeopleMessage);
    }
  }, [dataLoader, people]);

  const canShowTable: boolean = !error && dataLoader;

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {error === Message.peopleLoadingError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {error === Message.noPeopleMessage && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {canShowTable && (
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
              {people.map(person => {
                const mother =
                  people.find(p => p.name === person.motherName) || null;
                const motherSlug = mother ? mother.slug : null;

                const father =
                  people.find(p => p.name === person.fatherName) || null;
                const fatherSlug = father ? father.slug : null;

                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={cn({
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <Link
                        to={`../${person.slug}`}
                        className={cn('', {
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
                      {motherSlug ? (
                        <Link
                          className="has-text-danger"
                          to={`../${motherSlug}`}
                        >
                          {person.motherName || '-'}
                        </Link>
                      ) : (
                        person.motherName || '-'
                      )}
                    </td>
                    <td>
                      {fatherSlug ? (
                        <Link to={`../${fatherSlug}`}>
                          {person.fatherName || '-'}
                        </Link>
                      ) : (
                        person.fatherName || '-'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
