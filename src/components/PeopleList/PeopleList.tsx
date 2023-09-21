import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';

type Props = {};

const GENDER_FEMALE = 'f';
const GENDER_MALE = 'm';
const tableColumnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
const NOT_SET_VALUE = '-';

export const PeopleList: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);

  const [isLoadingErrorShown, setIsLoadingErrorShown] = useState(false);

  const { personSlug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((persons) => {
        const preparedPeople: Person[] = persons.map((person: Person) => ({
          ...person,
          mother: persons.find(({ sex, name }: Person) => sex === GENDER_FEMALE
            && name === person.motherName),
          father: persons.find(({ sex, name }: Person) => sex === GENDER_MALE
            && name === person.fatherName),
        }));

        setPeople(preparedPeople);
      })
      .catch(() => {
        setIsLoadingErrorShown(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const isDataAvailable = !isLoadingErrorShown && !!people.length;
  const isDataEmptyAndNoErrors = !people.length
  && !isLoadingErrorShown && !isLoading;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isDataAvailable && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    {tableColumnNames.map(name => <th key={name}>{name}</th>)}
                  </tr>
                </thead>

                <tbody>
                  {people.map((person) => {
                    const isFemale = person.sex === GENDER_FEMALE;
                    const {
                      name,
                      sex,
                      slug,
                      born,
                      died,
                      motherName,
                      fatherName,
                      mother,
                      father,
                    } = person;

                    return (
                      <tr
                        data-cy="person"
                        className={classNames({
                          'has-background-warning': slug === personSlug,
                        })}
                      >
                        <td>
                          <Link
                            to={slug}
                            className={classNames({
                              'has-text-danger': isFemale,
                            })}
                          >
                            {name}
                          </Link>
                        </td>

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>
                        <td>
                          {mother ? (
                            <Link
                              to={`${mother.slug}`}
                              replace
                              className="has-text-danger"
                            >
                              {motherName}
                            </Link>
                          ) : (
                            motherName || NOT_SET_VALUE
                          )}
                        </td>
                        <td>
                          {father ? (
                            <Link to={`${father.slug}`}>
                              {fatherName}
                            </Link>
                          ) : (
                            fatherName || NOT_SET_VALUE
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
        {isLoadingErrorShown && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isDataEmptyAndNoErrors && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </div>
    </div>
  );
};
