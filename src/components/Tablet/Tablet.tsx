import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  isLoader: boolean;
  isError: boolean;
};

export const Tablet: React.FC<Props> = ({ people, isLoader, isError }) => {
  const [checkedId, setCheckedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      setCheckedId(slug);
    }
  }, [slug]);

  const handleOnClick = (personSlug: string) => {
    navigate(`/people/${personSlug}`, { replace: true });
    setCheckedId(personSlug);
  };

  return (
    <div className="block">
      <div className="box table-container">
        {isLoader && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people?.length === 0 && !isLoader && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people && people.length > 0 && (
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
              {people?.map((person: Person) => {
                const motherInList = people.find(
                  per => per.name === person.motherName,
                );
                const fatherInList = people.find(
                  per => per.name === person.fatherName,
                );

                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      'has-background-warning': person.slug === checkedId,
                    })}
                  >
                    <td>
                      <a
                        className={classNames({
                          'has-text-danger': person.sex === 'f',
                        })}
                        href={`#/people/${person.slug}`}
                        onClick={() => {
                          handleOnClick(person.slug);
                        }}
                      >
                        {person.name}
                      </a>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {motherInList ? (
                        <PersonLink
                          handleOnClick={handleOnClick}
                          parent={motherInList}
                        />
                      ) : (
                        <span>
                          {person.motherName ? person.motherName : '-'}
                        </span>
                      )}
                    </td>

                    <td>
                      {fatherInList ? (
                        <PersonLink
                          handleOnClick={handleOnClick}
                          parent={fatherInList}
                        />
                      ) : (
                        <span>
                          {person.fatherName ? person.fatherName : '-'}
                        </span>
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
