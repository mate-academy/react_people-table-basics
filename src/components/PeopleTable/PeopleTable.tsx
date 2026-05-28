import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();

  return (
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
          {people.map(person => {
            const mother = people.find(currentPerson => {
              return currentPerson.name === person.motherName;
            });

            const father = people.find(currentPerson => {
              return currentPerson.name === person.fatherName;
            });

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={classNames({
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
                  {!person.motherName && '-'}

                  {person.motherName && mother && (
                    <PersonLink person={mother} />
                  )}

                  {person.motherName && !mother && person.motherName}
                </td>

                <td>
                  {!person.fatherName && '-'}

                  {person.fatherName && father && (
                    <PersonLink person={father} />
                  )}

                  {person.fatherName && !father && person.fatherName}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
