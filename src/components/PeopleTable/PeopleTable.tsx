import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classNames';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotif, setErrorNotif] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = peopleFromServer.map(person => {
          const mother = people.find(mother =>
            mother.name === person.motherName);
          const father = people.find(father =>
            father.name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(preparedPeople);
      })
      .catch(() => setErrorNotif('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="box table-container">
      {isLoading && <Loader />}

      {!isLoading && people.length === 0 && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {errorNotif && (
        <p data-cy="noPeopleMessage">
          Something went wrong
        </p>
      )}

      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        {!isLoading && (
          <>
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            />
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
              {people.map(person => (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={cn({
                    'has-background-warning': person.slug === slug,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>
                    {person.mother
                      ? <PersonLink person={person.mother} />
                      : person.motherName || '-'}
                  </td>

                  <td>
                    {person.father
                      ? <PersonLink person={person.father} />
                      : person.fatherName || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};
