import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import classNames from 'classnames';

type PersonLinkProps = {
  person?: Person;
  name?: string | null;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);
  const [noPeopleMessage, setNoPeopleMessage] = useState(false);
  const { peopleSlug } = useParams();

  useEffect(() => {
    setLoading(true);
    setNoPeopleMessage(false);
    setPeopleLoadingError(false);
    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);

        if (!fetchedPeople.length) {
          setNoPeopleMessage(true);
        }
      })
      .catch(() => setPeopleLoadingError(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const PersonLink = ({ person, name }: PersonLinkProps) => {
    const slug = person?.slug;
    const linkName = person?.name || name || '-';
    const parentsName = people.find(p => p.name === linkName);
    const isWoman = person?.sex === 'f' || parentsName?.sex === 'f';

    if (slug || parentsName) {
      return (
        <td>
          <Link
            to={`/people/${slug || parentsName?.slug}`}
            className={classNames({
              'has-text-danger': isWoman,
            })}
          >
            {linkName}
          </Link>
        </td>
      );
    }

    return <td>{linkName}</td>;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}
          {peopleLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {noPeopleMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !peopleLoadingError && (
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
                    className={classNames({
                      'has-background-warning': person.slug === peopleSlug,
                    })}
                  >
                    <PersonLink person={person} />
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <PersonLink name={person.motherName} />
                    <PersonLink name={person.fatherName} />
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
