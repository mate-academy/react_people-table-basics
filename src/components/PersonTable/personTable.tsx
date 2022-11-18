import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonInfo } from '../PersonInfo';

type Props = {
  selectedPerson: string;
};

export const PersonTable: React.FC<Props> = ({ selectedPerson = '' }) => {
  const [people, setPeople] = useState<Person[] | undefined>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getParents = (peopleFromServer: Person[]) => {
    return peopleFromServer.map(child => {
      const childFather = peopleFromServer.find(
        father => father.name === child.fatherName,
      );

      const childMother = peopleFromServer.find(
        mother => mother.name === child.motherName,
      );

      const fatherName = child.fatherName ? child.fatherName : '-';
      const motherName = child.motherName ? child.motherName : '-';

      return {
        ...child,
        father: childFather,
        mother: childMother,
        fatherName,
        motherName,
      };
    });
  };

  const loadPeople = async () => {
    setIsError(false);
    setIsLoading(true);
    const loadedPeole = await getPeople();

    try {
      if ('Error' in loadedPeole) {
        throw new Error();
      }

      setPeople(getParents(loadedPeole));
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const table = people?.length ? (
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
        {people?.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames(
              {
                'has-background-warning': selectedPerson === person.slug,
              },
            )}
          >
            <PersonInfo person={person} />
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p data-cy="noPeopleMessage">
      There are no people on the server
    </p>
  );

  const errorOrTable = isError ? (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  ) : (
    table
  );

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        { isLoading ? <Loader /> : errorOrTable }
      </div>
    </div>
  );
};
