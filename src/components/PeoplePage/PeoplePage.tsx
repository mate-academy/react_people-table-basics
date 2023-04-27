import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PersonList } from '../PersonList';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [allPeople, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(true);
  const { personSlug } = useParams();

  const loadPeople = async () => {
    try {
      const people = await getPeople();

      const addedLinkToPeople = people.map(person => {
        const copiedPerson = { ...person };
        const foundFather = people.find(human => (
          human.name === person.fatherName
        ));
        const foundMother = people.find(human => (
          human.name === person.motherName
        ));

        if (foundFather) {
          copiedPerson.father = foundFather;
        }

        if (foundMother) {
          copiedPerson.mother = foundMother;
        }

        return copiedPerson;
      });

      setPeople(addedLinkToPeople);
    } catch {
      setErrorMessage('Unable to download people from server');
    } finally {
      setIsLoaded(false);
    }
  };

  const noPeopleOnServer = !allPeople.length && !isLoaded && !errorMessage;

  useEffect(() => {
    loadPeople();
  }, []);

  if (noPeopleOnServer) {
    return (
      <p
        data-cy="noPeopleMessage"
        style={{
          fontSize: 26,
        }}
      >
        There are no people on the server
      </p>
    );
  }

  if (errorMessage) {
    return (
      <p
        data-cy="peopleLoadingError"
        className="has-text-danger"
        style={{
          fontSize: 26,
        }}
      >
        Unable to upload People from server
        <br />
        Please try again after 5 minutes
      </p>
    );
  }

  return (
    <div className="block">
      {isLoaded ? (
        <Loader />
      ) : (
        <div className="box table-container">
          <table
            data-cy="peopleTable"
            className="
              table
              is-striped
              is-hoverable
              is-narrow
              is-fullwidth"
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
              <PersonList
                personSlug={personSlug}
                people={allPeople}
              />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
