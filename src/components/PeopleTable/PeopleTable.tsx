import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
        {people.map(person => {
          const personMother = people.find(
            item => item.name === person.motherName,
          );
          const personFather = people.find(
            item => item.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
              key={`${person.name}-${person.born}`}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {personMother ? (
                  <PersonLink person={personMother} />
                ) : (
                  person.motherName || `-`
                )}
              </td>

              <td>
                {personFather ? (
                  <PersonLink person={personFather} />
                ) : (
                  person.fatherName || `-`
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
