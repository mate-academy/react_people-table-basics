import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const defaultPeople = [
  //   {
  //     name: 'Jan van Brussel',
  //     sex: 'm',
  //     born: 1714,
  //     died: 1748,
  //     fatherName: 'Jacobus van Brussel',
  //     motherName: 'Joanna van Rooten',
  //     slug: '',
  //   },
  //   {
  //     name: 'Philibert Haverbeke',
  //     sex: 'm',
  //     born: 1907,
  //     died: 1997,
  //     fatherName: 'Emile Haverbeke',
  //     motherName: 'Emma de Milliano',
  //     slug: '',
  //   },
  //   {
  //     name: 'Jan Frans van Brussel',
  //     sex: 'm',
  //     born: 1761,
  //     died: 1833,
  //     fatherName: 'Jacobus Bernardus van Brussel',
  //     motherName: '-',
  //     slug: '',
  //   },
  //   {
  //     name: 'Lievijne Jans',
  //     sex: 'f',
  //     born: 1542,
  //     died: 1582,
  //     fatherName: '-',
  //     motherName: '-',
  //     slug: '',
  //   },
  //   {
  //     name: 'Bernardus de Causmaecker',
  //     sex: 'm',
  //     born: 1721,
  //     died: 1789,
  //     fatherName: 'Lieven de Causmaecker',
  //     motherName: 'Livina Haverbeke',
  //     slug: '',
  //   },
  // ];

  useEffect(() => {
    getPeople()
      .then(response => {
        const withPerents = response.map(person => {
          const result = person;

          response.forEach(item => {
            if (item.name === person.fatherName) {
              result.father = item;
            }

            if (item.name === person.motherName) {
              result.mother = item;
            }
          });

          return result;
        });

        setPeople(withPerents);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <>
              <PeopleTable people={people} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
