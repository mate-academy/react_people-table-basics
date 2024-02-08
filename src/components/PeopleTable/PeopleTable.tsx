/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  peoples: Person[]
}

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const { slug } = useParams();

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
        {peoples.map(person => {
          const father = peoples.find(pers => pers.name === person.fatherName);
          const mother = peoples.find(pers => pers.name === person.motherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
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
                {mother
                  ? <PersonLink person={mother} />
                  : (person.motherName || '-')}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : (person.fatherName || '-')}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
