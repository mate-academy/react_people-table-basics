import React, { useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import PeopleTable from './PeopleTable';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const preparePeople = async () => {
    await getPeople()
      .then(response => {
        const preparedPeople = response.map((person, _, arr) => {
          const mother = arr.find(possibleParent => (
            possibleParent.name === person.motherName
          ));
          const father = arr.find(possibleParent => (
            possibleParent.name === person.fatherName
          ));

          return {
            ...person,
            mother: mother || null,
            father: father || null,
          };
        });

        setPeople(preparedPeople);
      })
      .catch(() => setIsError(true));
  };

  useEffect(() => {
    preparePeople();
  }, []);

  return (
    <div className="PeoplePage">
      <h1 className="text-center">People Page</h1>

      {isError
        ? (
          <h3
            className="text-center"
          >
            An error occured while loading people data
          </h3>
        )
        : (
          <>
            {people === null
              ? (
                <div className="d-flex justify-content-center">
                  <div
                    className="spinner-border"
                    style={{
                      width: '3rem',
                      height: '3rem',
                    }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )
              : (
                <PeopleTable people={people} />
              )}
          </>
        )}
    </div>
  );
};

export default PeoplePage;
