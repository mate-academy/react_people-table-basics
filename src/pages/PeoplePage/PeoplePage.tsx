import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../../components/PersonLink';
import { Loader } from '../../components/Loader';

const getParent = (parentName: string | null, parent?: Person) => {
  if (parent) {
    return <PersonLink person={parent} />;
  }

  if (parentName) {
    return parentName;
  }

  return '-';
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { slug: slugParam } = useParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then((res) => setPeople(res))
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {(isError && !isLoading) && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!people.length && !isLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && (
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
                  const {
                    slug,
                    sex,
                    born,
                    died,
                    motherName,
                    fatherName,
                  } = person;
                  const mother = people.find(({ name }) => name === motherName);
                  const father = people.find(({ name }) => name === fatherName);

                  return (
                    <tr
                      data-cy="person"
                      className={cn({
                        'has-background-warning': slugParam === slug,
                      })}
                      key={slug}
                    >
                      {/* eslint-disable-next-line */}
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>

                      <td>
                        {getParent(motherName, mother)}
                      </td>

                      <td>
                        {getParent(fatherName, father)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
