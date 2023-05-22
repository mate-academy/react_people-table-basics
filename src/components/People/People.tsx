import { Link, useParams } from 'react-router-dom';
import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { PeopleType } from '../../Type/People';

type Props = {
  person: PeopleType;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { name, slug } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {name}
    </Link>
  );
};

const peopleList = (peoples: PeopleType[]) => {
  const newPeople = peoples.map((person) => {
    const mother = peoples.find((p) => p.name === person.motherName);
    const father = peoples.find((p) => p.name === person.fatherName);

    return {
      ...person,
      mother: mother || null,
      father: father || null,
      motherName: person.motherName || '-',
      fatherName: person.fatherName || '-',
    };
  });

  return newPeople;
};

export const People = () => {
  const [people, setPeople] = React.useState<PeopleType[]>([]);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const selectedTodo = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );
        const data = await response.json();

        setPeople(peopleList(data));

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && (
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
                {people.map((person) => (
                  <tr
                    data-cy="person"
                    className={classNames({
                      'has-background-warning':
                        person.slug === selectedTodo.personId,
                    })}
                    key={person.slug}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother ? (
                        <PersonLink person={person.mother} />
                      ) : (
                        person.motherName
                      )}
                    </td>
                    <td>
                      {person.father ? (
                        <PersonLink person={person.father} />
                      ) : (
                        person.fatherName
                      )}
                    </td>
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
