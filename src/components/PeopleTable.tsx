import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useOutletContext, useParams } from 'react-router-dom';

export const PeopleTable = () => {
  const peoples = useOutletContext<Person[]>();
  const { slug } = useParams();

  return (
    <div className="block">
      <div className="box table-container">
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
            {peoples.map(person => {
              const mother = peoples.find(m => m.name === person.motherName);
              const father = peoples.find(f => f.name === person.fatherName);

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={
                    person.slug === slug ? 'has-background-warning' : ''
                  }
                >
                  <td>
                    <PersonLink person={person} peoples={peoples} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {!person.motherName ? (
                      '-'
                    ) : mother ? (
                      <PersonLink person={mother} peoples={peoples} />
                    ) : (
                      person.motherName
                    )}
                  </td>
                  <td>
                    {!person.fatherName ? (
                      '-'
                    ) : father ? (
                      <PersonLink person={father} peoples={peoples} />
                    ) : (
                      person.fatherName
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
