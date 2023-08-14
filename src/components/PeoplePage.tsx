import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types';
import { fetchPeopleData } from '../utils/fetchPeopleData';
import { generateNavLink } from '../utils/generateNavLink';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = React.useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const isSuccessfullyLoaded = !isError && !isLoading;
  const isPeopleArrayEmpty = peopleData?.length === 0 && !isError;

  const { personID } = useParams();

  React.useEffect(() => {
    setIsLoading(true);

    fetchPeopleData()
      .then((data) => {
        setPeopleData(data);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const findPerson = React.useMemo(() => (personName: string | null) => {
    const parent = peopleData?.find(
      (personFromAPI) => personFromAPI.name === personName,
    );

    if (parent) {
      return generateNavLink(parent);
    }

    return personName || '-';
  }, [peopleData]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            && (
              <Loader />
            )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isPeopleArrayEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isSuccessfullyLoaded
            && (
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
                  {peopleData?.map((person: Person) => {
                    const {
                      sex,
                      born,
                      died,
                      fatherName,
                      motherName,
                      slug,
                    } = person;

                    return (
                      <tr
                        data-cy="person"
                        key={slug}
                        className={classNames({
                          'has-background-warning': personID === slug,
                        })}
                      >
                        <td>
                          {generateNavLink(person)}
                        </td>

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>
                        <td>{findPerson(motherName)}</td>
                        <td>{findPerson(fatherName)}</td>
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
