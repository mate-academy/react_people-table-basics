import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

export const PeopleTable: React.FC = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { slug } = useParams();
  const isSelect = peopleData.find(person => person.slug === slug);

  const fetchPeopleData = async () => {
    try {
      const response = await fetch(
        'https://mate-academy.github.io/react_people-table/api/people.json',
      );

      const data = await response.json();

      setPeopleData(data);
    } catch {
      setError('Data loading error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeopleData();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {peopleData.length === 0 && !isLoading && !error && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {peopleData.length > 0 && !isLoading && !error && (
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
              {peopleData.map(person => {
                const { sex, born, died, fatherName, motherName, slug } =
                  person;

                const mother = peopleData.find(p => p.name === motherName);
                const father = peopleData.find(p => p.name === fatherName);

                return (
                  <tr
                    data-cy="person"
                    className={classNames({
                      'has-background-warning': slug === isSelect?.slug,
                    })}
                    key={slug}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    <td>{mother ? <PersonLink person={mother} /> : '-'}</td>
                    <td>{father ? <PersonLink person={father} /> : '-'}</td>
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
