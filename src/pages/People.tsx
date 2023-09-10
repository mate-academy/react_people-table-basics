import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { peopleStore } from '../Store';

export const People: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { human } = useParams();
  const { people, setPeople } = peopleStore();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const parentLink = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parent = people?.find(el => el.name === name);

    if (!parent) {
      return name;
    }

    return (
      <Link
        className={cn(
          { 'has-text-danger': parent.sex === 'f' },
        )}
        to={`../${parent.slug}`}
      >
        {parent.name}
      </Link>
    );
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
      </div>
      <div className="block">
        <div className="box table-container">

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(people?.length === 0 && !loading)
            && (
              <p
                data-cy="noPeopleMessage"
              >
                There are no people on the server
              </p>
            )}

          {loading
            ? <Loader />
            : (
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
                  {people?.map(({
                    name,
                    slug,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                  }) => {
                    return (
                      <tr
                        key={slug}
                        data-cy="person"
                        className={
                          cn({ 'has-background-warning': slug === human })
                        }
                      >
                        <td>
                          <Link
                            className={cn(
                              { 'has-text-danger': sex === 'f' },
                            )}
                            to={`../${slug}`}
                          >
                            {name}
                          </Link>
                        </td>

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>
                        <td>{parentLink(motherName)}</td>
                        <td>{parentLink(fatherName)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </main>
  );
};
