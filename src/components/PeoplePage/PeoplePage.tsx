import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, [people]);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        <Loader />

        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>

        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>

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
            {people.map(person => (
              <tr data-cy="person" key={person.name}>
                <td>
                  <a href="#/people/philibert-haverbeke-1907">
                    {person.name}
                  </a>
                </td>

                <td>m</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  <a
                    className="has-text-danger has-background-warning"
                    href="#/people/emma-de-milliano-1876"
                  >
                    {person.motherName}
                  </a>
                </td>

                <td>
                  <a href="#/people/emile-haverbeke-1877">
                    {person.fatherName}
                  </a>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};
