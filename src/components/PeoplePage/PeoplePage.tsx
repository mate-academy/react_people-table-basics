import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { HumanLink } from '../HumanLink/HumanLink';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getPeople()
      .then(humans => setPeople(humans))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const findFather = (person: Person) => {
    return people.find(father => father.name === person.fatherName);
  };

  const findMother = (person: Person) => {
    return people.find(mother => mother.name === person.motherName);
  };

  const isSelected = (person: Person) => person.slug === slug;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

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
              {people.map(human => {
                const father = findFather(human);
                const mother = findMother(human);

                return (
                  <tr
                    data-cy="person"
                    key={human.slug}
                    className={
                      classNames(
                        { 'has-background-warning': isSelected(human) },
                      )
                    }
                  >
                    <td>
                      <HumanLink human={human} />
                    </td>

                    <td>{human.sex}</td>
                    <td>{human.born}</td>
                    <td>{human.died}</td>
                    <td>
                      {mother
                        ? <HumanLink human={mother} />
                        : `${human.motherName || '-'}`}

                    </td>
                    <td>
                      {father
                        ? <HumanLink human={father} />
                        : `${human.fatherName || '-'}`}

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
