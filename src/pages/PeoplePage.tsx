import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import cn from 'classnames';
import { PersonLink } from '../components/PersonLink';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [showError, setShowError] = useState(false);

  const showParent = (parentName: string | null) => {
    if (parentName === null) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return <PersonLink person={parent} />;
    } else {
      return parentName;
    }
  };

  useEffect(() => {
    setIsloading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setShowError(true);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
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
                    key={person.slug}
                    className={cn({
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>{showParent(person.motherName)}</td>
                    <td>{showParent(person.fatherName)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {showError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !showError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
