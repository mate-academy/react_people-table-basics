import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';

interface Props {
  persone: Person | null,
}

const PersonLink: React.FC<Props> = ({ persone }) => {
  const { name, sex, slug } = persone as Person;

  return (
    <NavLink
      to={`../${slug}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
      style={sex === 'f' ? { color: 'red' } : {}}
    >
      {name}
    </NavLink>
  );
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();
  const isSelected = (persone: Person) => persone.slug === slug;

  const loadPeople = async () => {
    setIsLoading(true);
    try {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
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

          {people?.length === 0 ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          ) : ((!isError && !isLoading) && (
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
                {people?.map(persone => {
                  const {
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                  } = persone;

                  const isMotherPersone
                  = people?.find(per => per.name === motherName) || null;

                  const isFatherPersone
                  = people?.find(per => per.name === fatherName) || null;

                  const parentCell
                  = (someName: string | null, somePersone: Person | null) => {
                    return someName ? (
                      <td>
                        {somePersone
                          ? <PersonLink persone={somePersone} />
                          : someName}
                      </td>
                    ) : <td>-</td>;
                  };

                  return (
                    <tr
                      data-cy="person"
                      key={name}
                      className={classNames(
                        { 'has-background-warning': isSelected(persone) },
                      )}
                    >
                      <td>
                        <PersonLink persone={persone} />
                      </td>
                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      {parentCell(motherName, isMotherPersone)}
                      {parentCell(fatherName, isFatherPersone)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ))}
        </div>
      </div>
    </>
  );
};
