import { useContext } from 'react';
import { PersonLink } from '../PersonLink';
import { PeopleContext } from '../../context/PeopleContext';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);
  const { peopleName } = useParams();

  return (
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
        {people.map(p => {
          const motherPerson = people.find(
            person => person.name === p.motherName,
          );
          const fatherPerson = people.find(
            person => person.name === p.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={p.name}
              className={classNames({
                'has-background-warning': p.slug === peopleName,
              })}
            >
              <td>
                <PersonLink person={p} />
              </td>

              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>
              <td>
                {motherPerson ? (
                  <PersonLink person={motherPerson} />
                ) : (
                  p.motherName || '-'
                )}
              </td>
              <td>
                {fatherPerson ? (
                  <PersonLink person={fatherPerson} />
                ) : (
                  p.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
