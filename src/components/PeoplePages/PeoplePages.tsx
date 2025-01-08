/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable';
import { useParams } from 'react-router-dom';

const setParent = (personArr: Person[]) => {
  personArr.map(person => {
    person.father = personArr.find(
      personFather => person.fatherName === personFather.name,
    );
    person.mother = personArr.find(
      personMother => person.motherName === personMother.name,
    );
  });
};

export const PeoplePages = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [erroreMessage, setError] = useState('');
  const { index } = useParams();
  const selectedPerson = index ? index : '';

  useEffect(() => {
    getPeople()
      .then(setPeoples)
      .catch(errore => {
        setError('Something went wrong');
        throw errore;
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setParent(peoples);
    if (peoples.length) {
      setError('There are no people on the server');
    }
  }, [peoples]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>

            <p data-cy="noPeopleMessage"></p>
            */}
              <table
                data-cy="peopleTable"
                // eslint-disable-next-line max-len
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
                  {peoples.map(person => (
                    <PeopleTable
                      key={person.slug}
                      person={person}
                      index={selectedPerson}
                    />
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};
